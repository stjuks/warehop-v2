import { gql } from 'apollo-boost';
import { query, mutate } from '.';
import { ItemInput, ProductItem, ExpenseItem, PaginatedData } from '@shared/types';

export const FETCH_PRODUCTS = gql`
  query products($cursor: String, $limit: Int!) {
    products(pagination: { cursor: $cursor, limit: $limit }) {
      pageInfo {
        hasNextPage
        cursor
      }
      data {
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

export const DELETE_ITEM = ``;

export const EDIT_ITEM = ``;

export default {
  fetchProducts: async (variables: { limit: number; cursor?: string }) =>
    await query<PaginatedData<ProductItem>>({ query: FETCH_PRODUCTS, variables }),
  fetchServices: async (variables: { limit: number; cursor?: string }) =>
    await query<PaginatedData<ExpenseItem>>({ query: FETCH_SERVICES, variables }),
  searchItems: () => null,
  addItem: async (itemInput: ItemInput) =>
    await mutate<number>({ mutation: ADD_ITEM, variables: itemInput }),
  deleteItem: () => null,
  editItem: () => null
};
