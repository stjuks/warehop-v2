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
      addWarehouse(name: $name) {
        id
        name
      }
    }
  `,
  onMutate: ({ client, result }) => {
    const cacheValue = client?.readQuery({ query: FETCH_WAREHOUSES.query });

    const newValue = {
      warehouses: [...cacheValue.warehouses, result.data.addWarehouse],
    };

    client?.writeQuery({
      query: FETCH_WAREHOUSES.query,
      data: newValue,
    });
  },
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega ladu juba eksisteerib.',
    },
  },
});

export const DELETE_WAREHOUSE = new Mutation({
  mutation: `
    mutation deleteWarehouse($id: ID!) {
      deleteWarehouse(id: $id)
    }
  `,
  errorHandler: {
    DeletionRestrictedError: {
      WarehouseItems: 'Ladu ei saa kustutada, kuna selles on kaubad.',
    },
  },
});

export const EDIT_WAREHOUSE = new Mutation({
  mutation: `
    mutation editWarehouse($id: ID!, $name: String, $abbreviation: String) {
      editWarehouse(id: $id, name: $name, abbreviation: $abbreviation)
    }
  `,
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega ladu juba eksisteerib.',
    },
  },
});
