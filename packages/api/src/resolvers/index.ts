import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { GraphQLDate } from 'graphql-iso-date';

import userResolvers from './user';
import warehouseResolvers from './warehouse';
import commonResolvers from './common';
import partnerResolvers from './partner';
import itemResolvers from './item';
import invoiceResolvers from './invoice';

import models from '../db/models';

export interface Resolver {
    [key: string]: {
        [key: string]: (
            parent: any,
            args: any,
            context: {
                models: { [K in keyof typeof models]: ModelCtor<Model<any, any>> };
                sequelize: Sequelize;
            }
        ) => any;
    };
}

const customScalarResolver = {
    Date: GraphQLDate
};

export default [
    customScalarResolver,
    userResolvers,
    warehouseResolvers,
    commonResolvers,
    partnerResolvers,
    itemResolvers,
    invoiceResolvers
];
