import { gql } from 'apollo-server';

export default gql`
    type Unit {
        id: ID!
        name: String!
        abbreviation: String!
    }

    extend type Query {
        units: [Unit!]
    }

    extend type Mutation {
        addUnit(name: String!, abbreviation: String!): Unit!
        deleteUnit(id: ID!): Boolean!
        editUnit(id: ID!, name: String, abbreviation: String): Unit
    }
`;
