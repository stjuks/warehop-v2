import { Resolver, authResolver, ApolloContext, paginate } from '.';
import {
  InvoiceType,
  TransactionQueryInput,
  AddTransactionInput,
  Transaction,
} from '@shared/types';
import moment from 'moment';
import { Op, literal } from 'sequelize';

const resolver: Resolver = {
  Query: {
    incomes: authResolver(async ({ filter }: { filter: TransactionQueryInput }, context) => {
      return await findTransactions(context, { ...filter, type: 'INCOME' });
    }),
    expenses: authResolver(async ({ filter }: { filter: TransactionQueryInput }, context) => {
      return await findTransactions(context, { ...filter, type: 'EXPENSE' });
    }),
    transaction: authResolver(async ({ id }: { id: number }, { models, user }) => {
      return await models.Transaction.findOne({
        where: {
          id,
          userId: user.id,
        },
        include: [
          {
            model: models.Invoice,
            attributes: ['id', 'number', 'isLocked'],
            include: [{ model: models.Partner, attributes: ['id', 'name'] }],
          },
        ],
      });
    }),
  },
  Mutation: {
    addTransaction: authResolver(
      async ({ transaction }: { transaction: AddTransactionInput }, { models, user }) => {
        try {
          const addedTransaction = await models.Transaction.create({
            ...transaction,
            userId: user.id,
          });

          return addedTransaction.id;
        } catch (err) {
          throw err;
        }
      }
    ),
    addIncome: authResolver(
      async ({ transaction }: { transaction: AddTransactionInput }, context) => {
        return await addTransaction({ ...transaction, type: 'INCOME' }, context);
      }
    ),
    addExpense: authResolver(
      async ({ transaction }: { transaction: AddTransactionInput }, context) => {
        return await addTransaction({ ...transaction, type: 'EXPENSE' }, context);
      }
    ),
    deleteTransaction: authResolver(async ({ id }, { models, user }) => {
      return await models.Transaction.destroy({ where: { id, userId: user.id } });
    }),
    editTransaction: authResolver(
      async (
        { id, transaction }: { id: number; transaction: AddTransactionInput },
        { models, user }
      ) => {
        const [isUpdated] = await models.Transaction.update(transaction, {
          where: { userId: user.id, id },
        });

        return isUpdated;
      }
    ),
  },
};

const addTransaction = async (
  transaction: AddTransactionInput,
  { models, user }: ApolloContext
) => {
  try {
    const addedTransaction = await models.Transaction.create({
      ...transaction,
      userId: user.id,
    });

    return addedTransaction;
  } catch (err) {
    throw err;
  }
};

const findTransactions = async (context: ApolloContext, filter: TransactionQueryInput) => {
  const {
    type,
    pagination: { limit, cursor },
    startDate,
    endDate,
    generalQuery,
  } = filter;

  const { models, user } = context;

  const invoiceType: InvoiceType = type === 'EXPENSE' ? 'PURCHASE' : 'SALE';

  const where: any = {
    userId: user.id,
  };

  if (generalQuery) {
    const generalLike = { [Op.like]: `%${generalQuery}%` };

    where[Op.or] = [
      { '$invoice.number$': generalLike },
      { '$invoice.partner.name$': generalLike },
      { description: generalLike },
    ];
  }

  if (startDate && endDate) where.date = { [Op.between]: [startDate, endDate] };
  else if (startDate) where.date = { [Op.gte]: startDate };
  else if (endDate) where.date = { [Op.lte]: endDate };

  const transactions = await paginate(models.Transaction, {
    cursor,
    limit,
    order: [
      ['date', 'DESC'],
      ['id', 'DESC'],
    ],
    paginateBy: (obj) => {
      obj.date.toJSON = function () {
        return moment(this).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      };

      return {
        id: obj.id,
        date: obj.date,
      };
    },
    paginationFn: ({ id, date }) => ({
      [Op.and]: [
        literal(`(date, "Transaction"."id") <= ('${date}', '${id}')`)
      ],
    }),
    where,
    include: [
      {
        model: models.Invoice,
        where: { type: invoiceType, isLocked: true },
        attributes: ['id', 'number', 'isLocked'],
        include: [{ model: models.Partner, attributes: ['id', 'name'] }],
      },
    ],
  });

  return transactions;
};

export default resolver;
