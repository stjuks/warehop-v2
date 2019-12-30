import { gql } from 'apollo-server';

export default gql`
    type ItemType {
        id: ID!
        slug: String!
        name: String!
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
    }

    extend type Query {
        items: [Item!]!
    }

    extend type Mutation {
        addItem(item: ItemInput!): Item!
        deleteItem(id: ID!): Boolean!
        editItem(id: ID!, item: ItemInput): Item
    }
`;
