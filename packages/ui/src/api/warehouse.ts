import { gql } from 'apollo-boost-upload';
import Query from './Query';
import Mutation from './Mutation';

export const FETCH_WAREHOUSES = new Query({
  query: `
    query warehouses {
      warehouses {
        id
        name
      }
    }
  `,
  transformResult: (result) => result.warehouses,
});

export const ADD_WAREHOUSE = new Mutation({
  mutation: `
    mutation addWarehouse($name: String!) {
      addWarehouse(name: $name)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
});

export const DELETE_WAREHOUSE = new Mutation({
  mutation: `
    mutation deleteWarehouse($id: ID!) {
      deleteWarehouse(id: $id)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
});

export const EDIT_WAREHOUSE = new Mutation({
  mutation: `
    mutation editWarehouse($id: ID!, $name: String, $abbreviation: String) {
      editWarehouse(id: $id, name: $name, abbreviation: $abbreviation)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
});

const errorMessageHandler = {
  EntityAlreadyExistsError: {
    name: 'Sellise nimega ladu juba eksiteerib.',
  },
  DeletionRestrictedError: {
    WarehouseItems: 'Ladu ei saa kustutada, kuna selles on kaubad.',
  },
};

/* export default {
  fetchWarehouses: async () => await query<Warehouse[]>({ query: FETCH_WAREHOUSES }),
  addWarehouse: async (warehouse: Warehouse) =>
    await mutate<number>(
      { mutation: ADD_WAREHOUSE, variables: warehouse },
      { errorMessageHandler }
    ),
  deleteWarehouse: async (id: number) =>
    await mutate<boolean>(
      { mutation: DELETE_WAREHOUSE, variables: { id } },
      { errorMessageHandler }
    ),
  editWarehouse: async (id: number, editedWarehouse: Warehouse) =>
    await mutate<boolean>(
      { mutation: EDIT_WAREHOUSE, variables: { id, ...editedWarehouse } },
      { errorMessageHandler }
    ),
}; */
