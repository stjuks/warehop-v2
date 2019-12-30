import { ApolloServer } from 'apollo-server-express';

import schema from '../schema';
import sequelize from '../db/sequelize';
import models from '../db/models';
import resolvers from '../resolvers';
import { Application } from 'express';

const apollo = new ApolloServer({
    playground: true,
    typeDefs: schema,
    resolvers,
    context: ({ req, connection }) => {
        return { models, sequelize };
    }
});

export default {
    initialize: (opts: { app: Application; path: string }) => apollo.applyMiddleware(opts)
};