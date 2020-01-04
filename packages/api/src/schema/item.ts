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
        partner: Partner
        code: String
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

    extend type Query {
        items: [Item!]!
        products: [ProductItem!]!
        services: [ExpenseItem!]!
    }

    extend type Mutation {
        addItem(item: ItemInput!): ID!
        deleteItem(id: ID!): Boolean!
        editItem(id: ID!, item: ItemInput): Item
    }
`;
