import express from 'express';
import cors from 'cors';

import { UniqueError } from '@shared/errors';
import xd from '@shared/src';

console.log(xd);
console.log(UniqueError);

import db from './db';
import apollo from './util/apollo';
import passport from './util/passport';

const app = express();

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

apollo.initialize({ app, path: '/graphql' });
db.initialize();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
