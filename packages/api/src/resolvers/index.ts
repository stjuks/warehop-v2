import userResolvers from './user';
import { Model, ModelCtor } from 'sequelize-typescript';

export interface Resolver {
    [key: string]: {
        [key: string]: (
            parent: any,
            args: any,
            context: { models: { [key: string]: ModelCtor<Model<any, any>> } }
        ) => any;
    };
}

export default [userResolvers];
