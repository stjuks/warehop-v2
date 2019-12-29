import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    storage: ':memory:',
    dialectModule: pg,
    dialect: 'postgres',
    models: [__dirname + '/models']
});

export { sequelize };
