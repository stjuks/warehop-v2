import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import {
  PaginatedData,
  TransactionQueryInput,
  Transaction,
  AddTransactionInput
} from '@shared/types';

const transactionSchema = `
    pageInfo {
      hasNextPage
      cursor
    }
    data {
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
      date
      description
    }
`;

export const FETCH_EXPENSES = gql`
  query expenses(
    $pagination: PaginatedQueryInput!,
    $startDate: Date,
    $endDate: Date,
  ) {
    expenses(
      filter: {
        pagination: $pagination
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      ${transactionSchema}
    }
  }
`;

export const FETCH_INCOMES = gql`
  query incomes(
    $pagination: PaginatedQueryInput!,
    $startDate: Date,
    $endDate: Date,
  ) {
    incomes(
      filter: {
        pagination: $pagination
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      ${transactionSchema}
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation addTransaction($invoiceId: ID!, $sum: String!, $date: Date!, $description: String) {
    addTransaction(
      transaction: { invoiceId: $invoiceId, sum: $sum, date: $date, description: $description }
    )
  }
`;

export default {
  fetchIncomes: async (filter: TransactionQueryInput) =>
    await query<PaginatedData<Transaction>>({ query: FETCH_INCOMES, variables: filter }),
  fetchExpenses: async (filter: TransactionQueryInput) =>
    await query<PaginatedData<Transaction>>({ query: FETCH_EXPENSES, variables: filter }),
  addTransaction: async (transaction: AddTransactionInput) =>
    await mutate<number>({ mutation: ADD_TRANSACTION, variables: transaction })
};
