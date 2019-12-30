import { ApolloServer } from 'apollo-server-express';

import schema from '../schema';
import models from '../db/models';
import resolvers from '../resolvers';
import { Application } from 'express';

const apollo = new ApolloServer({
    playground: true,
    typeDefs: schema,
    resolvers,
    context: () => {
        return { models };
    }
});

export default {
    initialize: (opts: { app: Application; path: string }) => apollo.applyMiddleware(opts)
};
