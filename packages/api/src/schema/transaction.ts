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

  extend type Query {
    incomes(pagination: PaginatedQueryInput): PaginatedTransaction!
    expenses(pagination: PaginatedQueryInput): PaginatedTransaction!
  }

  extend type Mutation {
    addTransaction(transaction: TransactionInput!): ID!
    deleteTransaction(id: ID!): Boolean!
    editTransaction(id: ID!, transaction: TransactionInput!): Boolean!
  }
`;
