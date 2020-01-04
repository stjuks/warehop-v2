import gql from 'graphql-tag';

export default gql`
    interface InvoiceItem {
        id: ID!
        itemType: EntityType!
        name: String!
        quantity: Float!
        price: String!
        unit: Unit
    }

    type ExpenseInvoiceItem implements InvoiceItem {
        id: ID!
        itemType: EntityType!
        name: String!
        quantity: Float!
        price: String!
        unit: Unit
    }

    type ProductInvoiceItem implements InvoiceItem {
        id: ID!
        itemType: EntityType!
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
        invoiceType: EntityType!
        number: String!
        dueDate: Date!
        issueDate: Date!
        isPaid: Boolean!
        sum: String!
        description: String
        filePath: String
    }

    input InvoiceItemInput {
        itemType: EntityTypeInput!
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
        invoiceType: EntityTypeInput!
        number: String!
        items: [InvoiceItemInput!]!
        dueDate: Date!
        issueDate: Date!
        description: String
    }

    extend type Query {
        purchases: [Invoice!]!
        sales: [Invoice!]!
        invoiceItems(invoiceId: ID!): [InvoiceItem!]!
    }

    extend type Mutation {
        addInvoice(invoice: InvoiceInput!): ID!
    }
`;
