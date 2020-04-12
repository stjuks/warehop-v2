import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import {
  TransactionQueryInput,
  Transaction,
  AddTransactionInput,
  PaginatedData
} from '@shared/types';
import Query from './Query';

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

const addTransactionQuery = (queryName: string) => gql`
  mutation ${queryName}($invoiceId: ID!, $sum: String!, $date: Date!, $description: String) {
    ${queryName}(
      transaction: { invoiceId: $invoiceId, sum: $sum, date: $date, description: $description }
    )
  }
`;

export const FETCH_EXPENSES = gql`
  query expenses(
    $pagination: PaginatedQueryInput!,
    $startDate: Date,
    $endDate: Date,
    $generalQuery: String
  ) {
    expenses(
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
`;

export const FETCH_INCOMES = gql`
  query incomes(
    $pagination: PaginatedQueryInput!,
    $startDate: Date,
    $endDate: Date,
    $generalQuery: String
  ) {
    incomes(
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
`;

export const ADD_INCOME = addTransactionQuery('addIncome');
export const ADD_EXPENSE = addTransactionQuery('addExpense');

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

export const EDIT_TRANSACTION = gql`
  mutation editTransaction($id: ID!, $transaction: TransactionInput!) {
    editTransaction(id: $id, transaction: $transaction)
  }
`;

export const FETCH_TRANSACTION = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      ${transactionSchema}
    }
  }
`;

export const FETCH_EXPENZES = new Query<PaginatedData<Transaction>>({
  query: `lololol`,
  onFetchMore: (oldData, newData) => {
    return {
      ...newData,
      data: [...oldData.data, ...newData.data],
    };
  },
});

export default {
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
};
