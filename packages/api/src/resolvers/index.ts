import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { GraphQLDate } from 'graphql-iso-date';
import express from 'express';

import userResolvers from './user';
import warehouseResolvers from './warehouse';
import commonResolvers from './common';
import partnerResolvers from './partner';
import itemResolvers from './item';
import invoiceResolvers from './invoice';

import models from '../db/models';
import { User } from 'shared/types';
import { authenticateJWT } from '../util/passport';

interface ApolloContext {
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

export interface Resolver {
    [key: string]:
        | {
              __resolveType?: (args: any) => any;
          }
        | { [key: string]: ResolverFunction };
}

export function resolver(cb: ResolverCallback): ResolverFunction {
    return function(parent, args, context) {
        return cb(args, context);
    };
}

export function authResolver(cb: ResolverCallback): ResolverFunction {
    return async function(parent, args, context) {
        const user: any = await authenticateJWT(context.req, context.res);

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
    invoiceResolvers
];
