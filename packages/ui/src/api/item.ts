import { gql } from 'apollo-boost-upload';
import { query, mutate } from '.';
import { ItemInput, ProductItem, ExpenseItem, PaginatedData, ItemQueryInput } from '@shared/types';

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

export const FETCH_PRODUCT = gql`
  query product($id: ID!) {
    product(id: $id) {
      ${itemSchema}
    }
  }
`;

export const FETCH_PRODUCTS = gql`
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
`;

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

export const SEARCH_ITEMS = ``;

export const ADD_ITEM = gql`
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
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;

export const EDIT_ITEM = gql`
  mutation editItem($id: ID!, $item: ItemInput!) {
    editItem(id: $id, item: $item)
  }
`;

const errorMessageHandler = {
  EntityAlreadyExistsError: {
    name: 'Sellise nimega kaup juba eksisteerib.',
    code: 'Sellise koodiga kaup juba eksisteerib.'
  },
  DeletionRestrictedError: {
    InvoiceItems: 'Kaupa ei saa kustutada, kuna see on arvega seotud.'
  }
};

export default {
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
    await mutate<boolean>({ mutation: EDIT_ITEM, variables: { id, item } }, { errorMessageHandler })
};
