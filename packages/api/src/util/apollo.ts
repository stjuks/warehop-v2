import { ApolloServer } from 'apollo-server-express';

import schema from '../schema';
import sequelize, { Sequelize } from '../db/sequelize';
import models from '../db/models';
import resolvers from '../resolvers';
import { Application } from 'express';
import { authenticateJWT } from './passport';

const apollo = new ApolloServer({
    playground: true,
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        return { models, sequelize, req, res };
    }
});

export default {
    initialize: (opts: { app: Application; path: string }) => apollo.applyMiddleware(opts)
};
