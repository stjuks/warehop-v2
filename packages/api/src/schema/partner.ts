import gql from 'graphql-tag';

export default gql`
  input PartnerInput {
    name: String
    type: PartnerType
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

  input SearchPartnerInput {
    type: PartnerType
    pagination: PaginatedQueryInput
    name: String
    phoneNr: String
    email: String
    generalQuery: String
  }

  type Partner {
    id: ID!
    name: String!
    type: PartnerType!
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

  type PaginatedPartner {
    pageInfo: PageInfo!
    data: [Partner!]!
  }

  extend type Query {
    partners(filter: SearchPartnerInput): PaginatedPartner!
  }

  extend type Mutation {
    addPartner(partner: PartnerInput!): ID!
    deletePartner(id: ID!): Boolean!
    editPartner(id: ID!, partner: PartnerInput!): Boolean!
  }
`;
