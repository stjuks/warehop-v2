import { Sequelize, Model } from 'sequelize-typescript';
import pg from 'pg';

import models from './models';
import { createCompositeForeignKey } from '../util/helpers';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialectModule: pg,
    dialect: 'postgres',
    models: Object.values(models).map(model => model)
});

const initialize = async (args?: { force: boolean }) => {
    await sequelize.sync(args);

    await sequelize.query(
        createCompositeForeignKey({
            table: models.Invoice,
            cols: ['partnerId', 'userId'],
            ref: { table: models.Partner, cols: ['id', 'userId'] }
        })
    );

    await models.User.create({ name: 'Tõnn' });

};

export default { sequelize, initialize };
