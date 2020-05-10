import { TransactionType } from '@shared/types';
import Query from './Query';
import Mutation from './Mutation';
import { FETCH_INVOICE } from './invoice';

const transactionSchema = `
  id
  invoice {
    id
    number
    isLocked
    partner {
      name
    }
  }
  sum
  type
  date
  description
`;

const ADD_TRANSACTION = (type: TransactionType) => {
  const name = type === 'EXPENSE' ? 'addExpense' : 'addIncome';

  return new Mutation({
    mutation: `
      mutation ${name}($invoiceId: ID!, $sum: String!, $date: Date!, $description: String) {
        ${name}(
          transaction: { invoiceId: $invoiceId, sum: $sum, date: $date, description: $description }
        ) {
          id
          sum
          date
          type
          description
        }
      }
    `,
    onMutate: ({ client, result, variables }) => {
      const { invoiceId } = variables;
      const transaction = result.data[name];

      const cachedValue = client?.readQuery({
        query: FETCH_INVOICE.query,
        variables: { id: invoiceId },
      });

      if (cachedValue && cachedValue.invoice) {
        const { transactions, paidSum } = cachedValue.invoice;

        transactions.push(transaction);
        cachedValue.invoice.paidSum = Number(paidSum) + Number(transaction.sum);

        if (Number(cachedValue.invoice.paidSum) >= Number(cachedValue.invoice.sum)) {
          cachedValue.invoice.isPaid = true;
        }
      }

      client?.cache.reset();

      client?.writeQuery({
        query: FETCH_INVOICE.query,
        variables: { id: invoiceId },
        data: cachedValue,
      });
    },
  });
};

export const ADD_INCOME = ADD_TRANSACTION('INCOME');
export const ADD_EXPENSE = ADD_TRANSACTION('EXPENSE');

export const DELETE_TRANSACTION = new Mutation({
  mutation: `
    mutation deleteTransaction($id: ID!) {
      deleteTransaction(id: $id)
    }
  `,
});

export const EDIT_TRANSACTION = new Mutation({
  mutation: `
    mutation editTransaction($id: ID!, $transaction: TransactionInput!) {
      editTransaction(id: $id, transaction: $transaction)
    }
  `,
});

export const FETCH_TRANSACTION = new Query({
  query: `
    query transaction($id: ID!) {
      transaction(id: $id) {
        ${transactionSchema}
      }
    }
  `,
  transformResult: (result) => result.transaction,
});

const FETCH_TRANSACTIONS = (type: TransactionType) => {
  const name = type === 'INCOME' ? 'incomes' : 'expenses';

  return new Query({
    query: `
      query ${name}(
        $pagination: PaginatedQueryInput!,
        $startDate: Date,
        $endDate: Date,
        $generalQuery: String
      ) {
        ${name}(
          filter: {
            pagination: $pagination
            startDate: $startDate
            endDate: $endDate
            generalQuery: $generalQuery
          }
        ) {
          pageInfo {
            hasNextPage
            cursor
          }
          data {
            ${transactionSchema}
          }
        }
      }
    `,
    transformResult: (result) => (result ? result[name] : result),
    onFetchMore: (oldData, newData) => {
      return {
        [name]: {
          ...newData,
          data: [...oldData.data, ...newData.data],
        },
      };
    },
    fetchMoreOptions: (data, variables) => ({
      variables: {
        ...variables,
        pagination: { ...variables.pagination, cursor: data.pageInfo.cursor },
      },
    }),
  });
};

export const FETCH_EXPENSES = FETCH_TRANSACTIONS('EXPENSE');
export const FETCH_INCOMES = FETCH_TRANSACTIONS('INCOME');
