import models from './models';
import sequelize from './sequelize';
import { createCompositeForeignKey } from '../util/helpers';

const createForeignKeys = async () => {
    await sequelize.query(
        createCompositeForeignKey({
            table: models.Invoice,
            cols: ['partnerId', 'userId'],
            ref: { table: models.Partner, cols: ['id', 'userId'] }
        })
    );

    await sequelize.query(
        createCompositeForeignKey({
            table: models.Item,
            cols: ['unitId', 'userId'],
            ref: { table: models.Unit, cols: ['id', 'userId'] }
        })
    );

    await sequelize.query(
        createCompositeForeignKey({
            table: models.Item,
            cols: ['partnerId', 'userId'],
            ref: { table: models.Partner, cols: ['id', 'userId'] }
        })
    );

    await sequelize.query(
        createCompositeForeignKey({
            table: models.Transaction,
            cols: ['invoiceId', 'userId'],
            ref: { table: models.Invoice, cols: ['id', 'userId'] }
        })
    );
};

const createStaticData = async () => {
    await models.InvoiceType.bulkCreate([
        { slug: 'SALE', name: 'Müügiarve' },
        { slug: 'PURCHASE', name: 'Ostuarve' }
    ]);

    await models.PartnerType.bulkCreate([
        { slug: 'VENDOR', name: 'Tarnija' },
        { slug: 'CLIENT', name: 'Klient' }
    ]);

    await models.ItemType.bulkCreate([
        { slug: 'PRODUCT', name: 'Laoartikkel' },
        { slug: 'SERVICE', name: 'Teenus' },
        { slug: 'EXPENSE', name: 'Kuluartikkel' }
    ]);

    await models.TransactionType.bulkCreate([
        { slug: 'INCOME', name: 'Tulu' },
        { slug: 'EXPENSE', name: 'Kulu' }
    ]);
};

export default async () => {
    await createForeignKeys();
    await createStaticData();

    await models.User.create({ name: 'Test User' });
};
