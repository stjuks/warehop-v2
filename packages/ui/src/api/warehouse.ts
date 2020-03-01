import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import { Warehouse } from '@shared/types';

export const FETCH_WAREHOUSES = gql`
  query warehouses {
    warehouses {
      id
      name
    }
  }
`;

export const ADD_WAREHOUSE = gql`
  mutation addWarehouse($name: String!) {
    addWarehouse(name: $name)
  }
`;

export const DELETE_WAREHOUSE = gql`
  mutation deleteWarehouse($id: ID!) {
    deleteWarehouse(id: $id)
  }
`;

export const EDIT_WAREHOUSE = gql`
  mutation editWarehouse($id: ID!, $name: String, $abbreviation: String) {
    editWarehouse(id: $id, name: $name, abbreviation: $abbreviation)
  }
`;

const errorMessageHandler = {
  EntityAlreadyExistsError: {
    name: 'Sellise nimega ladu juba eksiteerib.'
  },
  DeletionRestrictedError: {
    WarehouseItems: 'Ladu ei saa kustutada, kuna selles on kaubad.'
  }
};

export default {
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
    )
};
