import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { Op, Transaction } from 'sequelize';
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
  return function (_parent, args, context) {
    validateSchema(args, validationSchema);

    return cb(args, context);
  };
}

export function authResolver(cb: ResolverCallback, validationSchema?: Schema): ResolverFunction {
  return async function (_parent, args, context) {
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
  paginateBy?: (lastObject) => object;
  paginationFn?: (cursor) => any;
}

export const paginate = async (model: ModelCtor, opts: PaginateOptions) => {
  const { cursor, limit, paginateBy, paginationFn, ...restOpts } = opts;
  let where: any = Object.assign({}, opts.where) || {};

  if (cursor) {
    const decryptedHash: any = fromCursorHash(cursor);

    console.log('DEKRÜPTEDHASH', JSON.parse(decryptedHash));

    if (paginationFn) {
      where = { ...where, ...paginationFn(JSON.parse(decryptedHash)) };
    } else {
      where.id = {
        [Op.gte]: isNaN(decryptedHash) ? decryptedHash : Number(decryptedHash),
      };
    }
  }

  const data = await model.findAll({
    order: [['id', 'ASC']],
    limit: limit ? limit + 1 : null,
    ...restOpts,
    where,
  });

  const result: PaginatedData<Model> = {
    pageInfo: {
      hasNextPage: data.length > limit,
      cursor: null,
    },
    data,
  };

  if (data.length > 0) {
    const { hasNextPage } = result.pageInfo;
    const lastDataObject: any = data[data.length - 1];

    const cursorObj = paginateBy ? paginateBy(lastDataObject) : lastDataObject.id;

    if (hasNextPage) {
      result.data.pop();
      console.log('CURSOROBJ', cursorObj);
      result.pageInfo.cursor = toCursorHash(cursorObj);
    }
  }

  return result;
};

interface FindOrCreateOptions extends FindOptions {
  defaults: any;
  transaction?: Transaction;
}

export const findOrCreate = async (model: ModelCtor, opts: FindOrCreateOptions) => {
  const { defaults, ...restOpts } = opts;
  const item = await model.findOne(restOpts);

  if (!item) {
    await model.create(opts.defaults, { transaction: opts.transaction });

    return await model.findOne(restOpts);
  }

  return item;
};

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  warehouseResolvers,
  commonResolvers,
  partnerResolvers,
  itemResolvers,
  invoiceResolvers,
  transactionResolver,
];
