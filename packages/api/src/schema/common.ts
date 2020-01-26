import gql from 'graphql-tag';

export default gql`
    type Unit {
        id: ID!
        name: String!
        abbreviation: String!
    }

    type Types {
        itemTypes: [ItemType!]!
        partnerTypes: [PartnerType!]!
        invoiceTypes: [InvoiceType!]!
    }

    extend type Query {
        units: [Unit!]
        types: Types!
    }

    extend type Mutation {
        addUnit(name: String!, abbreviation: String!): ID!
        deleteUnit(id: ID!): Boolean!
        editUnit(id: ID!, name: String, abbreviation: String): Unit
    }
`;
