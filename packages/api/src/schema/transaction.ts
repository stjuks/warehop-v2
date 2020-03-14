import gql from 'graphql-tag';

export default gql`
  type TransactionPartner {
    id: ID!
    name: String!
  }

  type TransactionInvoice {
    id: ID!
    number: String!
    partner: TransactionPartner!
  }

  type Transaction {
    id: ID!
    invoice: TransactionInvoice!
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
    generalQuery: String
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
