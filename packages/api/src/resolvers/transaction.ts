import { Resolver, authResolver, ApolloContext, paginate } from '.';
import { InvoiceType, TransactionQueryInput, AddTransactionInput } from '@shared/types';
import { Op } from 'sequelize';

const resolver: Resolver = {
  Query: {
    incomes: authResolver(async ({ filter }: { filter: TransactionQueryInput }, context) => {
      return await findTransactions(context, { ...filter, type: 'INCOME' });
    }),
    expenses: authResolver(async ({ filter }: { filter: TransactionQueryInput }, context) => {
      return await findTransactions(context, { ...filter, type: 'EXPENSE' });
    })
  },
  Mutation: {
    addTransaction: authResolver(
      async ({ transaction }: { transaction: AddTransactionInput }, { models, user }) => {
        try {
          const addedTransaction = await models.Transaction.create({
            ...transaction,
            userId: user.id
          });

          return addedTransaction.id;
        } catch (err) {
          throw err;
        }
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
          where: { userId: user.id, id }
        });

        return isUpdated;
      }
    )
  }
};

const findTransactions = async (context: ApolloContext, filter: TransactionQueryInput) => {
  const {
    type,
    pagination: { limit, cursor },
    startDate,
    endDate,
    generalQuery
  } = filter;

  const { models, user } = context;

  const invoiceType: InvoiceType = type === 'EXPENSE' ? 'PURCHASE' : 'SALE';

  const where: any = {
    userId: user.id
  };

  if (generalQuery) {
    const generalLike = { [Op.like]: `%${generalQuery}%` };

    where[Op.or] = [
      { '$invoice.number$': generalLike },
      { '$invoice.partner.name$': generalLike },
      { description: generalLike }
    ];
  }
  
  if (startDate && endDate) where.date = { [Op.between]: [startDate, endDate] };
  else if (startDate) where.date = { [Op.gte]: startDate };
  else if (endDate) where.date = { [Op.lte]: endDate };

  const transactions = await paginate(models.Transaction, {
    cursor,
    limit,
    order: [['date', 'DESC']],
    where,
    include: [
      {
        model: models.Invoice,
        where: { type: invoiceType, isLocked: true },
        attributes: ['id', 'number'],
        include: [{ model: models.Partner, attributes: ['id', 'name'] }]
      }
    ]
  });

  return transactions;
};

export default resolver;
