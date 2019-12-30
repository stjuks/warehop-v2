import express from 'express';
import cors from 'cors';

import db from './db';
import apollo from './util/apollo';

const app = express();

app.use(cors());

apollo.initialize({ app, path: '/graphql' });
db.initialize();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
