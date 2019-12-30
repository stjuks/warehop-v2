import { gql } from 'apollo-server';

export default gql`
    type PartnerType {
        id: ID!
        slug: String!
        name: String!
    }

    input PartnerInput {
        name: String!
        partnerTypeId: Int!
        regNr: String
        VATnr: String
        email: String
        phoneNr: String
        country: String
        county: String
        city: String
        street: String
        postalCode: String
    }

    type Partner {
        id: ID!
        name: String!
        partnerType: PartnerType!
        regNr: String
        VATnr: String
        email: String
        phoneNr: String
        country: String
        county: String
        city: String
        street: String
        postalCode: String
    }

    extend type Query {
        partners: [Partner!]!
    }

    extend type Mutation {
        addPartner(partner: PartnerInput!): ID!
        deletePartner(id: ID!): Boolean!
        editPartner(id: ID!, partner: PartnerInput!): Partner
    }
`;
