import gql from 'graphql-tag';

export default gql`
    type User {
        id: ID!
        name: String
        regNr: String
        email: String
        phoneNr: String
        country: String
        county: String
        city: String
        street: String
        postalCode: String
        token: String
    }

    extend type Query {
        users: [User!]
        user(id: ID!): User
    }

    extend type Mutation {
        googleLogin(accessToken: String!): User!
        signUp(name: String!): User!
        verify: User!
    }
`;
