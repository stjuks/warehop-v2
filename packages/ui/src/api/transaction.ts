import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import {
  PaginatedData,
  TransactionQueryInput,
  Transaction,
  AddTransactionInput
} from '@shared/types';

const transactionSchema = `
  id
  invoice {
    id
    number
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

const addTransactionQuery = (queryName: string) => gql`
  mutation ${queryName}($invoiceId: ID!, $sum: String!, $date: Date!, $description: String) {
    ${queryName}(
      transaction: { invoiceId: $invoiceId, sum: $sum, date: $date, description: $description }
    )
  }
`;

export const ADD_INCOME = addTransactionQuery('addIncome');
export const ADD_EXPENSE = addTransactionQuery('addExpense');

export const FETCH_TRANSACTION = gql`
  query transaction($id: ID!) {
    transaction(id: $id) {
      ${transactionSchema}
    }
  }
`;

export default {
  fetchIncomes: async (filter: TransactionQueryInput) =>
    await query<PaginatedData<Transaction>>({ query: FETCH_INCOMES, variables: filter }),
  fetchExpenses: async (filter: TransactionQueryInput) =>
    await query<PaginatedData<Transaction>>({ query: FETCH_EXPENSES, variables: filter }),
  fetchTransaction: async (id: number) =>
    await query<Transaction>({ query: FETCH_TRANSACTION, variables: { id } }),
  addIncome: async (transaction: AddTransactionInput) =>
    await mutate<number>({ mutation: ADD_INCOME, variables: transaction }),
  addExpense: async (transaction: AddTransactionInput) =>
    await mutate<number>({ mutation: ADD_EXPENSE, variables: transaction })
};
