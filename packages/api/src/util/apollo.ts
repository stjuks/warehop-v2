import { ApolloServer } from 'apollo-server-express';
import util from 'util';

import schema from '../schema';
import sequelize from '../db/sequelize';
import models from '../db/models';
import resolvers from '../resolvers';
import { Application } from 'express';
import { ValidationError as SequelizeValidationError, ValidationErrorItem } from 'sequelize';
import { formatError } from './helpers';

const apollo = new ApolloServer({
    playground: true,
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        return { models, sequelize, req, res };
    },
    formatError
});

export default {
    initialize: (opts: { app: Application; path: string }) => apollo.applyMiddleware(opts)
};
