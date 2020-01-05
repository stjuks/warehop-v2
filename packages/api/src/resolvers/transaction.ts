import { Resolver, authResolver, ApolloContext } from '.';
import { TransactionType, InvoiceType } from 'shared/types';

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
        incomes: authResolver(async (_args, context) => {
            return await findTransactions('INCOME', context);
        }),
        expenses: authResolver(async (_args, context) => {
            return await findTransactions('EXPENSE', context);
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

const findTransactions = async (type: TransactionType, { models, user }: ApolloContext) => {
    const invoiceType: InvoiceType = type === 'EXPENSE' ? 'PURCHASE' : 'SALE';

    const transactions = await models.Transaction.findAll({
        where: { userId: user.id },
        include: [{ model: models.Invoice, where: { type: invoiceType }, include: [models.Partner] }]
    });

    return transactions;
};

export default resolver;
