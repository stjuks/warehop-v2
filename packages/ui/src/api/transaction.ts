import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import {
  TransactionQueryInput,
  Transaction,
  AddTransactionInput,
  PaginatedData,
  TransactionType,
} from '@shared/types';
import Query from './Query';
import Mutation from './Mutation';

const transactionSchema = `
  id
  invoice {
    id
    number
    isLocked
    partner {
      id
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
        )
      }
    `,
    updateCache: (cache, result) => {
      console.log(cache, result);
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
  onMutate: ({ client }) => {
    client?.cache.reset();
  },
});

export const EDIT_TRANSACTION = new Mutation({
  mutation: `
    mutation editTransaction($id: ID!, $transaction: TransactionInput!) {
      editTransaction(id: $id, transaction: $transaction)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
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

/* export default {
  fetchIncomes: async (filter: TransactionQueryInput) =>
    await query<PaginatedData<Transaction>>({ query: FETCH_INCOMES, variables: filter }),
  fetchExpenses: async (filter: TransactionQueryInput) =>
    await query<PaginatedData<Transaction>>({ query: FETCH_EXPENSES, variables: filter }),
  fetchTransaction: async (id: number) =>
    await query<Transaction>({ query: FETCH_TRANSACTION, variables: { id } }),
  deleteTransaction: async (id: number) =>
    await mutate<boolean>({ mutation: DELETE_TRANSACTION, variables: { id } }),
  editTransaction: async (id: number, transaction: AddTransactionInput) =>
    await mutate<boolean>({ mutation: EDIT_TRANSACTION, variables: { id, transaction } }),
  addIncome: async (transaction: AddTransactionInput) =>
    await mutate<number>({ mutation: ADD_INCOME, variables: transaction }),
  addExpense: async (transaction: AddTransactionInput) =>
    await mutate<number>({ mutation: ADD_EXPENSE, variables: transaction }),
}; */
