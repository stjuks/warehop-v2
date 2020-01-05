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

    extend type Query {
        incomes: [Transaction!]!
        expenses: [Transaction!]!
    }

    extend type Mutation {
        addTransaction(transaction: TransactionInput!): ID!
        deleteTransaction(id: ID!): Boolean!
        editTransaction(id: ID!, transaction: TransactionInput!): Boolean!
    }
`;
