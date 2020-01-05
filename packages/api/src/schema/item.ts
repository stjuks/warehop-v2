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
        purchasePrice: String
        retailPrice: String
        description: String
        warehouseQuantity: [WarehouseQuantityInput!]!
    }

    interface Item {
        id: ID!
        type: ItemType!
        name: String!
        purchasePrice: String
        retailPrice: String
        description: String
        unit: Unit
    }

    type ProductItem implements Item {
        id: ID!
        type: ItemType!
        name: String!
        purchasePrice: String
        retailPrice: String
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
        purchasePrice: String
        retailPrice: String
        description: String
        unit: Unit
    }

    input ItemSearchInput {
        type: ItemType!
        name: String
        code: String
        description: String
    }

    extend type Query {
        products: [ProductItem!]!
        services: [ExpenseItem!]!
        searchItems(query: ItemSearchInput!): [Item!]!
    }

    extend type Mutation {
        addItem(item: ItemInput!): ID!
        deleteItem(id: ID!): Boolean!
        editItem(id: ID!, item: ItemInput): Item
    }
`;
