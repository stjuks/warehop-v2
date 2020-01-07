import models from './models';
import sequelize from './sequelize';
import { createCompositeForeignKey, createCheckConstraint } from '../util/helpers';

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

const createCheckConstraints = async () => {
    await sequelize.query(
        createCheckConstraint({
            table: models.Invoice,
            name: 'check_sum_date',
            query: 'sum >= 0 AND "dueDate" >= "issueDate"'
        })
    );

    await sequelize.query(
        createCheckConstraint({
            table: models.InvoiceItem,
            name: 'check_quantity_price',
            query: 'quantity >= 0 AND price >= 0'
        })
    );

    await sequelize.query(
        createCheckConstraint({
            table: models.Item,
            name: 'check_price',
            query: '"purchasePrice" >= 0 AND "retailPrice" >= 0'
        })
    );

    await sequelize.query(
        createCheckConstraint({
            table: models.Transaction,
            name: 'check_sum_date',
            query: 'sum >= 0 AND date < Now()'
        })
    );

    await sequelize.query(
        createCheckConstraint({
            table: models.WarehouseItem,
            name: 'check_quantity',
            query: 'quantity >= 0'
        })
    );
};

const createStaticData = async () => {
    await models.InvoiceType.bulkCreate([{ id: 'SALE' }, { id: 'PURCHASE' }]);
    await models.PartnerType.bulkCreate([{ id: 'VENDOR' }, { id: 'CLIENT' }]);
    await models.ItemType.bulkCreate([{ id: 'PRODUCT' }, { id: 'SERVICE' }, { id: 'EXPENSE' }]);
};

const createTestData = async () => {
    await models.User.create({ name: 'Test user' });
    await models.Unit.create({ name: 'Tükk', abbreviation: 'tk', userId: 1 });
    await models.Warehouse.create({ name: 'Ladu 1', userId: 1 });
    await models.Partner.create({ name: 'CIRCLE K', type: 'VENDOR', userId: 1 });
};

export default async () => {
    await createForeignKeys();
    await createStaticData();
    await createCheckConstraints();
    await createTestData();
};
