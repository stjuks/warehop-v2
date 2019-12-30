import { gql } from 'apollo-server';

import userSchema from './user';
import warehouseSchema from './warehouse';
import commonSchema from './common';
import partnerSchema from './partner';
import itemSchema from './item';

const baseSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

export default [baseSchema, userSchema, warehouseSchema, commonSchema, partnerSchema, itemSchema];
