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

    await sequelize.query(
        createCompositeForeignKey({
            table: models.WarehouseItem,
            cols: ['warehouseId', 'userId'],
            ref: { table: models.Warehouse, cols: ['id', 'userId'] }
        })
    );

    await sequelize.query(
        createCompositeForeignKey({
            table: models.WarehouseItem,
            cols: ['itemId', 'userId'],
            ref: { table: models.Item, cols: ['id', 'userId'] }
        })
    );
};

const createStaticData = async () => {
    await models.InvoiceType.bulkCreate([{ id: 'SALE' }, { id: 'PURCHASE' }]);

    await models.PartnerType.bulkCreate([{ id: 'VENDOR' }, { id: 'CLIENT' }]);

    await models.ItemType.bulkCreate([{ id: 'PRODUCT' }, { id: 'SERVICE' }, { id: 'EXPENSE' }]);

    await models.User.create({ name: 'Test user' });
};

export default async () => {
    await createForeignKeys();
    await createStaticData();
};
