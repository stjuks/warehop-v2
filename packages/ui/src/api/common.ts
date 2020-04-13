import { gql } from 'apollo-boost-upload';
import { Unit, ItemType, PartnerType, InvoiceType } from '@shared/types';
import Query from './Query';
import Mutation from './Mutation';

export const ADD_UNIT = new Mutation({
  mutation: `
    mutation addUnit($name: String!, $abbreviation: String!) {
      addUnit(name: $name, abbreviation: $abbreviation)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
});

export const DELETE_UNIT = new Mutation({
  mutation: `
    mutation deleteUnit($id: ID!) {
      deleteUnit(id: $id)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
});

export const EDIT_UNIT = new Mutation({
  mutation: `
    mutation editUnit($id: ID!, $name: String, $abbreviation: String) {
      editUnit(id: $id, name: $name, abbreviation: $abbreviation) {
        id
        name
        abbreviation
      }
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
});

export const FETCH_UNITS = new Query<Unit[]>({
  query: `
    query units {
      units {
        id
        name
        abbreviation
      }
    }
  `,
  transformResult: (result) => result.units,
});

export const FETCH_TYPES = new Query<{
  itemTypes: ItemType[];
  partnerTypes: PartnerType[];
  invoiceTypes: InvoiceType[];
}>({
  query: `
    query types {
      types {
        itemTypes
        partnerTypes
        invoiceTypes
      }
    }
  `,
  transformResult: (result) => result.types,
});

const errorMessageHandler = {
  EntityAlreadyExistsError: {
    name: 'Sellise nimega ühik juba eksisteerib',
    abbreviation: 'Sellise lühendiga ühik juba eksisteerib.',
  },
  DeletionRestrictedError: {
    Items: 'Ühikut ei saa kustutada, kuna see on kaubaga seotud.',
  },
};

/* export default {
  fetchUnits: async () => await query<Unit[]>({ query: FETCH_UNITS }),
  addUnit: async (unit: Unit) =>
    await mutate<number>({ mutation: ADD_UNIT, variables: unit }, { errorMessageHandler }),
  deleteUnit: async (id: number) =>
    await mutate<boolean>({ mutation: DELETE_UNIT, variables: { id } }, { errorMessageHandler }),
  editUnit: async (id: number, editedUnit: Unit) =>
    await mutate<boolean>(
      { mutation: EDIT_UNIT, variables: { id, ...editedUnit } },
      { errorMessageHandler }
    ),
  fetchTypes: async () =>
    await query<{
      itemTypes: ItemType[];
      partnerTypes: PartnerType[];
      invoiceTypes: InvoiceType[];
    }>({
      query: FETCH_TYPES,
    }),
}; */
