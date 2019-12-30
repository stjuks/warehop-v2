import { Model, ModelCtor } from 'sequelize-typescript';

import userResolvers from './user';
import warehouseResolvers from './warehouse';
import commonResolvers from './common';
import partnerResolvers from './partner';
import itemResolvers from './item';

export interface Resolver {
    [key: string]: {
        [key: string]: (
            parent: any,
            args: any,
            context: { models: { [key: string]: ModelCtor<Model<any, any>> } }
        ) => any;
    };
}

export default [userResolvers, warehouseResolvers, commonResolvers, partnerResolvers, itemResolvers];
