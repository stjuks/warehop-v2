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
    partner: InvoicePartner!
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

  type InvoicePartner {
    name: String
    regNr: String
    VATnr: String
    phoneNr: String
    email: String
    street: String
    postalCode: String
    county: String
    country: String
  }

  input InvoicePartnerInput {
    name: String!
    savePartner: Boolean!
    regNr: String
    VATnr: String
    phoneNr: String
    email: String
    street: String
    postalCode: String
    county: String
    country: String
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
    partner: InvoicePartnerInput!
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
    isLocked: Boolean
  }

  type PaginatedInvoice {
    pageInfo: PageInfo!
    data: [Invoice!]!
  }

  type LockReturn {
    id: ID!
    isLocked: Boolean!
  }

  type InvoiceCount {
    paid: Float!
    unpaid: Float!
    unlocked: Float!
  }

  extend type Query {
    purchases(filter: InvoiceSearchInput): PaginatedInvoice!
    sales(filter: InvoiceSearchInput): PaginatedInvoice!
    invoiceItems(invoiceId: ID!): [InvoiceItem!]!
    invoice(id: ID!): Invoice
    invoiceCounts(type: InvoiceType): InvoiceCount!
  }

  extend type Mutation {
    addInvoice(invoice: InvoiceInput!): ID!
    editInvoice(id: ID!, invoice: InvoiceInput!): Invoice!
    deleteInvoice(id: ID!): Invoice!
    lockInvoice(id: ID!): Invoice!
    unlockInvoice(id: ID!): Invoice!
  }
`;
