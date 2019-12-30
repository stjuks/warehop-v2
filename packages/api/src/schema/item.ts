import { gql } from 'apollo-server';

export default gql`
    type ItemType {
        id: ID!
        slug: String!
        name: String!
    }

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
        itemTypeId: Int!
        name: String!
        partnerId: Int
        unitId: Int
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
        itemType: ItemType
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
