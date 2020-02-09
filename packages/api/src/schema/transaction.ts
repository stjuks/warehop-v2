import gql from 'graphql-tag';

export default gql`
  type Transaction {
    id: ID!
    invoice: Invoice!
    sum: String!
    date: Date!
    description: String
  }

  input TransactionInput {
    invoiceId: ID!
    sum: String!
    date: Date!
    description: String
  }

  type PaginatedTransaction {
    pageInfo: PageInfo!
    data: [Transaction!]!
  }

  input TransactionQueryInput {
    pagination: PaginatedQueryInput!
    startDate: Date
    endDate: Date
  }

  extend type Query {
    incomes(filter: TransactionQueryInput): PaginatedTransaction!
    expenses(filter: TransactionQueryInput): PaginatedTransaction!
  }

  extend type Mutation {
    addTransaction(transaction: TransactionInput!): ID!
    deleteTransaction(id: ID!): Boolean!
    editTransaction(id: ID!, transaction: TransactionInput!): Boolean!
  }
`;
