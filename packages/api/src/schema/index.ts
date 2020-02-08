import gql from 'graphql-tag';

import userSchema from './user';
import warehouseSchema from './warehouse';
import commonSchema from './common';
import partnerSchema from './partner';
import itemSchema from './item';
import invoiceSchema from './invoice';
import transactionSchema from './transaction';

const baseSchema = gql`
  scalar Date

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  enum InvoiceType {
    SALE
    PURCHASE
  }

  enum PartnerType {
    CLIENT
    VENDOR
  }

  enum ItemType {
    PRODUCT
    SERVICE
    EXPENSE
  }

  type PageInfo {
    hasNextPage: Boolean!
    cursor: String
  }

  input PaginatedQueryInput {
    cursor: String
    limit: Int
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [
  baseSchema,
  userSchema,
  warehouseSchema,
  commonSchema,
  partnerSchema,
  itemSchema,
  invoiceSchema,
  transactionSchema
];
