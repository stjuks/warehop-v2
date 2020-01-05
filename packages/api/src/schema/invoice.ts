import gql from 'graphql-tag';

export default gql`
    interface InvoiceItem {
        id: ID!
        type: ItemType!
        name: String!
        quantity: Float!
        price: String!
        unit: Unit
    }

    type ExpenseInvoiceItem implements InvoiceItem {
        id: ID!
        type: ItemType!
        name: String!
        quantity: Float!
        price: String!
        unit: Unit
    }

    type ProductInvoiceItem implements InvoiceItem {
        id: ID!
        type: ItemType!
        name: String!
        quantity: Float!
        price: String!
        code: String!
        warehouse: Warehouse!
        unit: Unit!
    }

    type Invoice {
        id: ID!
        partner: Partner!
        type: InvoiceType!
        number: String!
        dueDate: Date!
        issueDate: Date!
        items: [InvoiceItem!]!
        transactions: [Transaction!]!
        isPaid: Boolean!
        sum: String!
        description: String
        filePath: String
    }

    input InvoiceItemInput {
        type: ItemType!
        quantity: Float!
        price: String!
        name: String!
        id: ID
        warehouseId: ID
        unitId: ID
        code: String
    }

    input InvoiceInput {
        partnerId: ID!
        type: InvoiceType!
        number: String!
        items: [InvoiceItemInput!]!
        dueDate: Date!
        issueDate: Date!
        description: String
    }

    input InvoiceSearchInput {
        type: InvoiceType!
        number: String
        isPaid: Boolean
        description: String
        partnerName: String
    }

    extend type Query {
        purchases: [Invoice!]!
        sales: [Invoice!]!
        invoiceItems(invoiceId: ID!): [InvoiceItem!]!
        searchInvoices(query: InvoiceSearchInput!): [Invoice!]!
    }

    extend type Mutation {
        addInvoice(invoice: InvoiceInput!): ID!
    }
`;
