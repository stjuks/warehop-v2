import { Resolver, authResolver, ApolloContext, paginate } from '.';
import { TransactionType, InvoiceType, PaginatedQueryInput } from '@shared/types';

interface TransactionInput {
    id: number;
    transaction: {
        invoiceId: number;
        sum: string;
        date: Date;
        description?: string;
    };
}

const resolver: Resolver = {
    Query: {
        incomes: authResolver(async ({ pagination }: { pagination: PaginatedQueryInput }, context) => {
            return await findTransactions(context, { type: 'INCOME', ...pagination });
        }),
        expenses: authResolver(async ({ pagination }: { pagination: PaginatedQueryInput }, context) => {
            return await findTransactions(context, { type: 'EXPENSE', ...pagination });
        })
    },
    Mutation: {
        addTransaction: authResolver(async ({ transaction }: TransactionInput, { models, user }) => {
            try {
                const addedTransaction = await models.Transaction.create({ ...transaction, userId: user.id });

                return addedTransaction.id;
            } catch (err) {
                throw err;
            }
        }),
        deleteTransaction: authResolver(async ({ id }, { models, user }) => {
            return await models.Transaction.destroy({ where: { id, userId: user.id } });
        }),
        editTransaction: authResolver(async ({ id, transaction }: TransactionInput, { models, user }) => {
            const [isUpdated] = await models.Transaction.update(transaction, {
                where: { userId: user.id, id }
            });

            return isUpdated;
        })
    }
};

const findTransactions = async (
    context: ApolloContext,
    opts: { type: TransactionType; cursor?: string; limit?: number }
) => {
    const { type, cursor, limit } = opts;
    const { models, user } = context;

    const invoiceType: InvoiceType = type === 'EXPENSE' ? 'PURCHASE' : 'SALE';

    const transactions = await paginate(models.Transaction, {
        cursor,
        limit,
        where: { userId: user.id },
        include: [{ model: models.Invoice, where: { type: invoiceType }, include: [models.Partner] }]
    });

    return transactions;
};

export default resolver;
