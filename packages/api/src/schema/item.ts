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

    type Item {
        id: ID!
        partner: Partner
        unit: Unit
        type: ItemType!
        name: String!
        code: String
        purchasePrice: String
        retailPrice: String
        description: String
        warehouseQuantity: [WarehouseQuantity!]!
    }

    extend type Query {
        items: [Item!]!
    }

    extend type Mutation {
        addItem(item: ItemInput!): ID!
        deleteItem(id: ID!): Boolean!
        editItem(id: ID!, item: ItemInput): Item
    }
`;
