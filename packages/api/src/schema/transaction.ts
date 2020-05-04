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
    isLocked: Boolean!
  }

  type Transaction {
    id: ID!
    invoice: TransactionInvoice!
    sum: String!
    date: Date!
    type: TransactionType!
    description: String
  }

  input TransactionInput {
    invoiceId: ID!
    sum: String!
    date: Date!
    type: TransactionType
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
    transaction(id: ID!): Transaction
  }

  extend type Mutation {
    addTransaction(transaction: TransactionInput!): Transaction!
    addIncome(transaction: TransactionInput!): Transaction!
    addExpense(transaction: TransactionInput!): Transaction!
    deleteTransaction(id: ID!): Boolean!
    editTransaction(id: ID!, transaction: TransactionInput!): Boolean!
  }
`;
