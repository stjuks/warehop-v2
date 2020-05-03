import { gql } from 'apollo-boost-upload';
import { ProductItem, PaginatedData } from '@shared/types';
import Query from './Query';
import Mutation from './Mutation';

const itemSchema = `
  id
  type
  name
  purchasePrice
  retailPrice
  description
  unit {
    id
    name
    abbreviation
  }
  ... on ProductItem {
    code
    partner {
      id
      name
    }
    warehouseQuantity {
      id
      name
      quantity
    }
  }
`;

export const FETCH_PRODUCT = new Query({
  query: ` 
    query product($id: ID!) {
      product(id: $id) {
        ${itemSchema}
      }
    }
  `,
  transformResult: (result) => result.product,
});

export const FETCH_PRODUCTS = new Query({
  query: `
    query products(
      $name: String
      $code: String
      $description: String
      $generalQuery: String
      $pagination: PaginatedQueryInput
      $warehouseId: ID
    ) {
      products(
        filter: {
          name: $name
          code: $code
          description: $description
          generalQuery: $generalQuery
          pagination: $pagination
          warehouseId: $warehouseId
        }
      ) {
        pageInfo {
          hasNextPage
          cursor
        }
        data {
          ${itemSchema}
        }
      }
    }
  `,
  transformResult: (result) => result?.products,
  onFetchMore: (oldData, newData) => {
    return {
      products: {
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

export const FETCH_SERVICES = gql`
  query services($cursor: String, $limit: Int!) {
    services(pagination: { cursor: $cursor, limit: $limit }) {
      id
      type
      name
      purchasePrice
      retailPrice
      description
      unit {
        id
        name
        abbreviation
      }
    }
  }
`;

export const ADD_ITEM = new Mutation({
  mutation: `
    mutation addItem(
      $type: ItemType!
      $name: String!
      $partnerId: ID
      $unitId: ID
      $code: String
      $purchasePrice: String
      $retailPrice: String
      $description: String
      $warehouseQuantity: [WarehouseQuantityInput!]!
    ) {
      addItem(
        item: {
          type: $type
          name: $name
          partnerId: $partnerId
          unitId: $unitId
          code: $code
          purchasePrice: $purchasePrice
          retailPrice: $retailPrice
          description: $description
          warehouseQuantity: $warehouseQuantity
        }
      )
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega kaup juba eksisteerib.',
      code: 'Sellise koodiga kaup juba eksisteerib.',
    },
  },
});

export const DELETE_ITEM = new Mutation({
  mutation: `
    mutation deleteItem($id: ID!) {
      deleteItem(id: $id)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
  errorHandler: {
    DeletionRestrictedError: {
      InvoiceItems: 'Kaupa ei saa kustutada, kuna see on arvega seotud.',
    },
  },
});

export const EDIT_ITEM = new Mutation({
  mutation: `
    mutation editItem($id: ID!, $item: ItemInput!) {
      editItem(id: $id, item: $item)
    }
  `,
  updateCache: (cache, result) => {
    console.log(cache, result);
  },
  errorHandler: {
    EntityAlreadyExistsError: {
      name: 'Sellise nimega kaup juba eksisteerib.',
      code: 'Sellise koodiga kaup juba eksisteerib.',
    },
  },
});

/* export default {
  fetchProduct: async (id: number) =>
    await query<ProductItem>({ query: FETCH_PRODUCT, variables: { id } }),
  fetchProducts: async (filter: ItemQueryInput) =>
    await query<PaginatedData<ProductItem>>({ query: FETCH_PRODUCTS, variables: filter }),
  fetchServices: async (variables: { limit: number; cursor?: string }) =>
    await query<PaginatedData<ExpenseItem>>({ query: FETCH_SERVICES, variables }),
  searchItems: () => null,
  addItem: async (itemInput: ItemInput) =>
    await mutate<number>({ mutation: ADD_ITEM, variables: itemInput }, { errorMessageHandler }),
  deleteItem: async (id: number) =>
    await mutate<boolean>({ mutation: DELETE_ITEM, variables: { id } }, { errorMessageHandler }),
  editItem: async (id: number, item: ItemInput) =>
    await mutate<boolean>(
      { mutation: EDIT_ITEM, variables: { id, item } },
      { errorMessageHandler }
    ),
}; */
