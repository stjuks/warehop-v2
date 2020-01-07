import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { GraphQLDate } from 'graphql-iso-date';
import express from 'express';

import userResolvers from './user';
import warehouseResolvers from './warehouse';
import commonResolvers from './common';
import partnerResolvers from './partner';
import itemResolvers from './item';
import invoiceResolvers from './invoice';
import transactionResolver from './transaction';

import models from '../db/models';
import { User } from 'shared/types';
import { authenticateJWT } from '../util/passport';
import Joi, { Schema } from '@hapi/joi';
import { JoiObject } from 'joi';

export interface ApolloContext {
    models: { [K in keyof typeof models]: ModelCtor<Model<any, any>> };
    sequelize: Sequelize;
    req: express.Request;
    res: express.Response;
    user?: User;
}

type ResolverFunction = (
    parent: any,
    args: any,
    context: ApolloContext
) => ResolverCallback | Promise<ResolverCallback>;

type ResolverCallback = (args: any, context: ApolloContext) => any;

type ValidationCallback = (args: any) => any;

export interface Resolver {
    [key: string]:
        | {
              __resolveType?: (args: any) => any;
          }
        | { [key: string]: ResolverFunction };
}

const validateSchema = (args: any, validationSchema?: Schema) => {
    if (validationSchema) {
        const result = validationSchema.validate(args);

        if (result.error) throw result.error;
    }
};

export function resolver(cb: ResolverCallback, validationSchema?: Schema): ResolverFunction {
    return function(_parent, args, context) {
        validateSchema(args, validationSchema);

        return cb(args, context);
    };
}

export function authResolver(cb: ResolverCallback, validationSchema?: Schema): ResolverFunction {
    return async function(_parent, args, context) {
        const user: any = await authenticateJWT(context.req, context.res);

        validateSchema(args, validationSchema);

        if (user) {
            context.user = user;
            return cb(args, context);
        }

        throw Error('Unauthorized.');
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
    invoiceResolvers,
    transactionResolver
];
