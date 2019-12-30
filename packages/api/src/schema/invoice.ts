import { gql } from 'apollo-server';

export default gql`
    type InvoiceType {
        id: ID!
        slug: String!
        name: String!
    }

    type InvoiceItem {
        id: ID!
        quantity: Float!
    }

    type Invoice {
        id: ID!
        partner: Partner!
        invoiceType: InvoiceType!
        number: String!
        dueDate: Date!
        issueDate: Date!
        isPaid: Boolean!
        sum: String!
        description: String
        filePath: String
    }

    extend type Query {
        invoices: [Invoice!]!
    }

    extend type Mutation {
        addItem(item: ItemInput!): Item!
        deleteItem(id: ID!): Boolean!
        editItem(id: ID!, item: ItemInput): Item
    }
`;
