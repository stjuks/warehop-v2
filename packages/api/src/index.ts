import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import { sequelize } from './db';

const app = express();

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: true });

app.get('/', (req, res) => {
    res.send('lekWorld');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
