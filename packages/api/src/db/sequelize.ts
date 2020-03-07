import { Sequelize, Model } from 'sequelize-typescript';
import pg from 'pg';

import models from './models';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialectModule: pg,
  dialect: 'postgres',
  models: Object.values(models).map(model => model),
  define: {
    timestamps: false
  }
});

export { Sequelize };

export default sequelize;
