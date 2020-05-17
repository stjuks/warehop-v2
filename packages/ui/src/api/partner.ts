import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import { Partner, PaginatedData, SearchPartnerInput } from '@shared/types';
import Query from './Query';
import Mutation from './Mutation';

const partnerSchema = `
    id
    name
    type
    regNr
    VATnr
    email
    phoneNr
    address
    county
    postalCode
`;

export const FETCH_PARTNERS = new Query({
  query: `
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
  `,
  transformResult: (result) => result?.partners,
  onFetchMore: (oldData, newData) => {
    return {
      partners: {
        ...newData,
        data: [...oldData.data, ...newData.data],
      },
    };
  },
  fetchMoreOptions: (data, variables) => ({
    variables: {
      ...variables,
      pagination: { ...variables.pagination, cursor: data.pageInfo.cursor },
    },
  }),
});

export const FETCH_CREDITINFO_PARTNERS = new Query({
  query: `
    query searchCreditInfo($query: String!) {
      searchCreditInfo(query: $query) {
        name
        regNr
        address
        phoneNr
        email
        VATnr
        postalCode
        county
      }
    }
  `,
  transformResult: (result) => result.searchCreditInfo,
});

export const ADD_PARTNER = new Mutation({
  mutation: `
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
  `,
  onMutate: ({ client }) => client?.cache.reset(),
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega partner juba eksisteerib.',
    },
  },
});

export const DELETE_PARTNER = new Mutation({
  mutation: `
    mutation deletePartner($id: ID!) {
      deletePartner(id: $id)
    }
  `,
  onMutate: ({ client }) => client?.cache.reset(),
  errorHandler: {
    DeletionRestrictedError: {
      InvoiceItems: 'Partnerit ei saa kustutada, kuna ta on arvega seotud.',
      Items: 'Partnerit ei saa kustutada, kuna ta on kaubaga seotud.',
    },
  },
});

export const EDIT_PARTNER = new Mutation({
  mutation: `
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
  `,
  onMutate: ({ client }) => client?.cache.reset(),
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega partner juba eksisteerib.',
    },
  },
});

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
