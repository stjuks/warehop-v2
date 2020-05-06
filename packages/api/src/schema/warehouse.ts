import gql from 'graphql-tag';

export default gql`
  type Warehouse {
    id: ID!
    name: String!
  }

  extend type Query {
    warehouses: [Warehouse]
  }

  extend type Mutation {
    addWarehouse(name: String!): Warehouse!
    deleteWarehouse(id: ID!): Boolean!
    editWarehouse(id: ID!, name: String!): Warehouse!
  }
`;
