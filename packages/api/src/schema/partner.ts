import gql from 'graphql-tag';

export default gql`
    input PartnerInput {
        name: String!
        partnerTypeId: PartnerType!
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
        partnerTypeId: PartnerType!
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
