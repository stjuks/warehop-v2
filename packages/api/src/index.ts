import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import db from './db';
import schema from './schema';
import resolvers from './resolvers';
import models from './db/models';

const app = express();

app.use(cors());

const apollo = new ApolloServer({
    playground: true,
    typeDefs: schema,
    resolvers,
    context: () => {
        return { models }
    }
});

apollo.applyMiddleware({ app, path: '/graphql' });

db.initialize({ force: true });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
