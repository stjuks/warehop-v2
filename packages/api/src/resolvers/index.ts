import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import express from 'express';
import util from 'util';

import userResolvers from './user';
import warehouseResolvers from './warehouse';
import commonResolvers from './common';
import partnerResolvers from './partner';
import itemResolvers from './item';
import invoiceResolvers from './invoice';
import transactionResolver from './transaction';

import models from '../db/models';
import { User, PaginatedData } from '@shared/types';
import { authenticateJWT } from '../util/passport';
import { Schema } from '@hapi/joi';
import { toCursorHash, fromCursorHash } from '../util/helpers';
import { FindOptions } from 'sequelize/types';

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

interface PaginateOptions extends FindOptions {
    cursor: string;
    limit: number;
    paginateBy?: string;
}

export const paginate = async (model: ModelCtor, opts: PaginateOptions) => {
    const { cursor, limit, paginateBy, ...restOpts } = opts;
    const where: any = opts.where || {};

    if (cursor) {
        const decryptedHash: any = fromCursorHash(cursor);
        if (paginateBy) {
            where[paginateBy] = {
                [Op.gte]: decryptedHash
            };
        } else {
            where.id = {
                [Op.gte]: isNaN(decryptedHash) ? decryptedHash : Number(decryptedHash)
            };
        }
    }

    const data = await model.findAll({
        order: [['id', 'ASC']],
        limit: limit ? limit + 1 : null,
        where,
        ...restOpts
    });

    const result: PaginatedData<Model> = {
        pageInfo: {
            hasNextPage: data.length > limit,
            cursor: null
        },
        data
    };

    if (data.length > 0) {
        const { hasNextPage } = result.pageInfo;
        const lastDataObject = data[data.length - 1];

        if (hasNextPage) {
            result.data.pop();
            result.pageInfo.cursor = toCursorHash(lastDataObject[paginateBy || 'id']);
        }
    }

    return result;
};

const customScalarResolver = {
    Date: GraphQLDateTime
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
