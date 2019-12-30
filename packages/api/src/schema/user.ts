import { gql } from 'apollo-server';

export default gql`
    type User {
        id: ID!
        name: String!
        regNr: String
        email: String
        phoneNr: String
        country: String
        county: String
        city: String
        street: String
        postalCode: String
    }

    extend type Query {
        users: [User!]
        user(id: ID!): User
    }

    extend type Mutation {
        signUp(name: String!): User!
    }
`;
