import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import { Unit, ItemType, PartnerType, InvoiceType } from '@shared/types';

export const FETCH_UNITS = gql`
  query units {
    units {
      id
      name
      abbreviation
    }
  }
`;

export const ADD_UNIT = gql`
  mutation addUnit($name: String!, $abbreviation: String!) {
    addUnit(name: $name, abbreviation: $abbreviation)
  }
`;

export const DELETE_UNIT = gql`
  mutation deleteUnit($id: ID!) {
    deleteUnit(id: $id)
  }
`;

export const EDIT_UNIT = gql`
  mutation editUnit($id: ID!, $name: String, $abbreviation: String) {
    editUnit(id: $id, name: $name, abbreviation: $abbreviation) {
      id
      name
      abbreviation
    }
  }
`;

export const FETCH_TYPES = gql`
  query types {
    types {
      itemTypes
      partnerTypes
      invoiceTypes
    }
  }
`;

export default {
  fetchUnits: async () => await query<Unit[]>({ query: FETCH_UNITS }),
  addUnit: async (unit: Unit) => await mutate<number>({ mutation: ADD_UNIT, variables: unit }),
  deleteUnit: async (id: number) =>
    await mutate<boolean>({ mutation: DELETE_UNIT, variables: { id } }),
  editUnit: async (id: number, editedUnit: Unit) =>
    await mutate<boolean>({ mutation: EDIT_UNIT, variables: { id, ...editedUnit } }),
  fetchTypes: async () =>
    await query<{
      itemTypes: ItemType[];
      partnerTypes: PartnerType[];
      invoiceTypes: InvoiceType[];
    }>({
      query: FETCH_TYPES
    })
};
