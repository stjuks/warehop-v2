import { ApolloServer, UserInputError, ValidationError } from 'apollo-server-express';
import util from 'util';

import schema from '../schema';
import sequelize from '../db/sequelize';
import models from '../db/models';
import resolvers from '../resolvers';
import { Application } from 'express';

const apollo = new ApolloServer({
    playground: true,
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        return { models, sequelize, req, res };
    },
    formatError: err => {
        console.log(util.inspect(err, false, null, true));
        return err;
    }
});

export default {
    initialize: (opts: { app: Application; path: string }) => apollo.applyMiddleware(opts)
};
