import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import { Partner, PaginatedData, SearchPartnerInput } from '@shared/types';

const partnerSchema = `
    id
    name
    type
    regNr
    VATnr
    email
    phoneNr
    country
    county
    city
    street
    postalCode
`;

export const FETCH_PARTNERS = gql`
  query partners(
    $type: PartnerType, 
    $pagination: PaginatedQueryInput, 
    $name: String, 
    $email: String, 
    $phoneNr: String,
    $generalQuery: String
  ) {
    partners(
      filter: { 
        type: $type 
        pagination: $pagination
        name: $name
        email: $email
        phoneNr: $phoneNr
        generalQuery: $generalQuery
      }
    ) {
        pageInfo {
          hasNextPage
          cursor
        }
        data {
          ${partnerSchema}
        }
    }
  }
`;

export const ADD_PARTNER = gql`
  mutation addPartner(
    $name: String!
    $type: PartnerType!
    $regNr: String
    $VATnr: String
    $email: String
    $phoneNr: String
    $country: String
    $county: String
    $city: String
    $street: String
    $postalCode: String
  ) {
    addPartner(
      partner: {
        name: $name
        type: $type
        regNr: $regNr
        VATnr: $VATnr
        email: $email
        phoneNr: $phoneNr
        country: $country
        county: $county
        city: $city
        street: $street
        postalCode: $postalCode
      }
    )
  }
`;

export const DELETE_PARTNER = gql`
  mutation deletePartner($id: ID!) {
    deletePartner(id: $id)
  }
`;

export const SEARCH_PARTNERS = gql`
    query searchPartners($type: PartnerType!, $name: String, $phoneNr: String, $email: String, $generalQuery: String) {
        searchPartners(query: {
            type: $type
            name: $name
            phoneNr: $phoneNr
            email: $email
            generalQuery: $generalQuery
        }) {
            ${partnerSchema}
        }
    }
`;

export const EDIT_PARTNER = gql`
  mutation editPartner(
    $id: ID!
    $name: String!
    $type: PartnerType!
    $regNr: String
    $VATnr: String
    $email: String
    $phoneNr: String
    $country: String
    $county: String
    $city: String
    $street: String
    $postalCode: String
  ) {
    editPartner(
      id: $id
      partner: {
        name: $name
        type: $type
        regNr: $regNr
        VATnr: $VATnr
        email: $email
        phoneNr: $phoneNr
        country: $country
        county: $county
        city: $city
        street: $street
        postalCode: $postalCode
      }
    )
  }
`;

export default {
  fetchPartners: async (filter: SearchPartnerInput) =>
    await query<PaginatedData<Partner>>({ query: FETCH_PARTNERS, variables: filter }),
  addPartner: async (partner: Partner) =>
    await mutate<number>({ mutation: ADD_PARTNER, variables: partner }),
  deletePartner: async (id: number) =>
    await mutate<boolean>({ mutation: DELETE_PARTNER, variables: { id } }),
  editPartner: async (id: number, editedPartner: Partner) =>
    await mutate<boolean>({ mutation: EDIT_PARTNER, variables: { id, ...editedPartner } })
};
