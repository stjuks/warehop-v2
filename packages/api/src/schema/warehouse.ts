import { gql } from 'apollo-server';

export default gql`
    type Warehouse {
        id: ID!
        name: String!
    }

    extend type Query {
        warehouses: [Warehouse]
    }

    extend type Mutation {
        addWarehouse(name: String!): ID!
        deleteWarehouse(id: ID!): Boolean!
        editWarehouse(id: ID!, name: String!): Warehouse
    }
`;
