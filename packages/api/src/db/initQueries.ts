import models from './models';
import sequelize from './sequelize';
import { createCompositeForeignKeys, createCheckConstraint } from '../util/helpers';

const createForeignKeys = async () => {
  await sequelize.query(
    createCompositeForeignKeys([
      {
        table: models.Invoice,
        cols: ['partnerId', 'userId'],
        ref: { table: models.Partner, cols: ['id', 'userId'] },
        onDelete: 'RESTRICT'
      },
      {
        table: models.Item,
        cols: ['unitId', 'userId'],
        ref: { table: models.Unit, cols: ['id', 'userId'] },
        onDelete: 'RESTRICT'
      },
      {
        table: models.Item,
        cols: ['partnerId', 'userId'],
        ref: { table: models.Partner, cols: ['id', 'userId'] },
        onDelete: 'RESTRICT'
      },
      {
        table: models.Transaction,
        cols: ['invoiceId', 'userId'],
        ref: { table: models.Invoice, cols: ['id', 'userId'] },
        onDelete: 'CASCADE'
      },
      {
        table: models.WarehouseItem,
        cols: ['warehouseId', 'userId'],
        ref: { table: models.Warehouse, cols: ['id', 'userId'] },
        onDelete: 'RESTRICT'
      },
      {
        table: models.WarehouseItem,
        cols: ['itemId', 'userId'],
        ref: { table: models.Item, cols: ['id', 'userId'] },
        onDelete: 'CASCADE'
      }
    ])
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
      query: 'sum >= 0 AND date <= Now()'
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
  await models.Partner.create({ name: 'Olerex AS', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'Pipedrive OÜ', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'Kuehne-Nagel Eesti AS', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'Telia AS', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'Tele2 AS', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'Elisa AS', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'Philips Eesti AS', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'Euronics AS', type: 'VENDOR', userId: 1 });
  await models.Partner.create({ name: 'ON/OFF AS', type: 'VENDOR', userId: 1 });
};

export const createProcedures = async () => {
  await sequelize.query(`
        CREATE OR REPLACE FUNCTION add_invoice_paid_sum() RETURNS trigger AS $update_invoice_paid_sum$
            BEGIN
                IF (TG_OP = 'DELETE') THEN
                    UPDATE "Invoices" SET "paidSum"=("paidSum" - OLD.sum) WHERE id=OLD."invoiceId";
                ELSIF (TG_OP = 'INSERT') THEN
                    UPDATE "Invoices" SET "paidSum"=("paidSum" + NEW.sum) WHERE id=NEW."invoiceId";
                ELSIF (TG_OP = 'UPDATE') THEN
                    UPDATE "Invoices" SET "paidSum"=("paidSum" + (NEW.sum - OLD.sum)) WHERE id=OLD."invoiceId";
                END IF;
                RETURN NULL;
            END;
        $update_invoice_paid_sum$ LANGUAGE plpgsql;

        CREATE TRIGGER update_invoice_paid_sum 
        AFTER INSERT OR UPDATE OR DELETE ON "Transactions"
        FOR EACH ROW EXECUTE PROCEDURE add_invoice_paid_sum();
    `);
};

const createIndexes = async () => {
  await sequelize.query(`
        START TRANSACTION;
        CREATE INDEX "Invoices_number_trgm_idx" ON "Invoices" USING GIN(number gin_trgm_ops);
        CREATE INDEX "Invoices_description_trgm_idx" ON "Invoices" USING GIN(description gin_trgm_ops);
        CREATE INDEX "Items_name_trgm_idx" ON "Items" USING GIN(name gin_trgm_ops);
        CREATE INDEX "Items_code_trgm_idx" ON "Items" USING GIN(code gin_trgm_ops);
        CREATE INDEX "Partners_name_trgm_idx" ON "Partners" USING GIN(name gin_trgm_ops);
        COMMIT;
    `);
};

export default async () => {
  await createForeignKeys();
  await createStaticData();
  await createCheckConstraints();
  await createTestData();
  await createProcedures();
  await createIndexes();
};
