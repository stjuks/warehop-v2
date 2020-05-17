import gql from 'graphql-tag';

export default gql`
  type WarehouseQuantity {
    id: ID!
    name: String!
    quantity: Float!
  }

  input WarehouseQuantityInput {
    id: ID!
    name: String!
    quantity: Float!
  }

  input ItemInput {
    type: ItemType!
    name: String!
    partnerId: ID
    unitId: ID
    code: String
    purchasePrice: Float
    retailPrice: Float
    description: String
    warehouseQuantity: [WarehouseQuantityInput!]!
  }

  interface Item {
    id: ID!
    type: ItemType!
    name: String!
    purchasePrice: Float
    retailPrice: Float
    description: String
    unit: Unit
  }

  type ProductItem implements Item {
    id: ID!
    type: ItemType!
    name: String!
    purchasePrice: Float
    retailPrice: Float
    description: String
    unit: Unit!
    code: String!
    partner: Partner
    warehouseQuantity: [WarehouseQuantity!]!
  }

  type ExpenseItem implements Item {
    id: ID!
    type: ItemType!
    name: String!
    purchasePrice: Float
    retailPrice: Float
    description: String
    unit: Unit
  }

  input ItemQueryInput {
    name: String
    code: String
    description: String
    generalQuery: String
    pagination: PaginatedQueryInput
    warehouseId: ID
  }

  type PaginatedItem {
    pageInfo: PageInfo!
    data: [Item!]!
  }

  extend type Query {
    products(filter: ItemQueryInput): PaginatedItem!
    services(filter: ItemQueryInput): PaginatedItem!
    product(id: ID!): Item
  }

  extend type Mutation {
    addItem(item: ItemInput!): ID!
    deleteItem(id: ID!): Boolean!
    editItem(id: ID!, item: ItemInput!): Boolean!
  }
`;
