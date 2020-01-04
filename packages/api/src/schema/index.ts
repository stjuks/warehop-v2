import gql from 'graphql-tag';

import userSchema from './user';
import warehouseSchema from './warehouse';
import commonSchema from './common';
import partnerSchema from './partner';
import itemSchema from './item';
import invoiceSchema from './invoice';

const baseSchema = gql`
    scalar Date

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

    enum TransactionType {
        INCOME
        EXPENSE
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

export default [baseSchema, userSchema, warehouseSchema, commonSchema, partnerSchema, itemSchema, invoiceSchema];
