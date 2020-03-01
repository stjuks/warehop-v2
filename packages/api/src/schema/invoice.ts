import gql from 'graphql-tag';

export default gql`
  interface InvoiceItem {
    id: ID!
    type: ItemType
    name: String
    quantity: Float
    price: String
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
    paidSum: String!
    sum: String!
    isLocked: Boolean!
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
    file: Upload
  }

  input InvoiceSearchInput {
    type: InvoiceType
    pagination: PaginatedQueryInput
    number: String
    isPaid: Boolean
    description: String
    partnerName: String
    generalQuery: String
  }

  type PaginatedInvoice {
    pageInfo: PageInfo!
    data: [Invoice!]!
  }

  extend type Query {
    purchases(filter: InvoiceSearchInput): PaginatedInvoice!
    sales(filter: InvoiceSearchInput): PaginatedInvoice!
    invoiceItems(invoiceId: ID!): [InvoiceItem!]!
    invoice(id: ID!): Invoice
  }

  extend type Mutation {
    addInvoice(invoice: InvoiceInput!): ID!
    lockInvoice(id: ID!): Boolean!
    unlockInvoice(id: ID!): Boolean!
  }
`;
