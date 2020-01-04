import { Sequelize } from 'sequelize-typescript';
import currency from 'currency.js';

import { Resolver, authResolver } from '.';

import { ItemType, InvoiceType } from 'shared/types';

interface InvoiceItemInput {
    itemType: ItemType;
    quantity: number;
    price: string;
    name: string;
    id?: number;
    warehouseId?: number;
    unitId?: number;
    code?: string;
}

interface AddInvoiceInput {
    invoice: {
        partnerId: number;
        invoiceType: InvoiceType;
        number: string;
        sum: string;
        items: InvoiceItemInput[];
        dueDate: Date;
        issueDate: Date;
        description: string;
    };
}

const resolver: Resolver = {
    Query: {
        purchases: authResolver(async (_args, { models, user }) => {
            const purchases = await models.Invoice.findAll({
                where: {
                    userId: user.id
                },
                include: [{ model: models.InvoiceType, where: { slug: 'PURCHASE' } }, models.Partner]
            });

            return purchases;
        }),
        sales: authResolver(async (_args, { models, user }) => {
            const sales = await models.Invoice.findAll({
                where: {
                    userId: user.id
                },
                include: [{ model: models.InvoiceType, where: { slug: 'SALE' } }, models.Partner]
            });

            return sales;
        }),
        invoiceItems: authResolver(async ({ invoiceId }, { models, user }) => {
            const invoiceItems = await models.InvoiceItem.findAll({
                where: {
                    userId: user.id,
                    invoiceId
                },
                include: [
                    { model: models.Item, include: [models.ItemType], attributes: ['id', 'code'] },
                    models.Unit,
                    models.Warehouse
                ],
                attributes: ['name', 'quantity', 'price']
            });

            const parsedItems = invoiceItems.map(item => {
                const plainItem: any = item.get({ plain: true });

                return {
                    ...plainItem,
                    ...plainItem.item
                };
            });

            return parsedItems;
        })
    },
    Mutation: {
        addInvoice: authResolver(async ({ invoice }: AddInvoiceInput, { models, sequelize, user }) => {
            const { items, ...restInvoice } = invoice;

            restInvoice.sum = items
                .reduce<currency>(
                    (acc, item) => currency(acc).add(currency(item.price).multiply(item.quantity)),
                    currency(0)
                )
                .toString();

            const transaction = await sequelize.transaction();

            const addInvoice = async () => {
                return await models.Invoice.create(
                    { ...restInvoice, invoiceTypeId: invoice.invoiceType.id, userId: user.id },
                    { transaction }
                );
            };

            const findOrCreateNewItem = async item => {
                return await models.Item.findOrCreate({
                    where: invoiceItemWhere(item, user.id),
                    defaults: {
                        ...item,
                        userId: user.id,
                        partnerId: item.itemType.slug === 'PRODUCT' ? invoice.partnerId : undefined,
                        itemTypeId: item.itemType.id,
                        [invoice.invoiceType.slug === 'PURCHASE' ? 'purchasePrice' : 'retailPrice']: item.price
                    },
                    transaction
                });
            };

            const upsertProduct = async item => {
                const [, isNewItem] = await models.WarehouseItem.findOrCreate({
                    defaults: { ...item, itemId: item.id, userId: user.id },
                    where: { userId: user.id, itemId: item.id },
                    transaction
                });

                if (!isNewItem) {
                    const operator = invoice.invoiceType.slug === 'SALE' ? '-' : '+';

                    await models.WarehouseItem.update(
                        {
                            quantity: Sequelize.literal(`quantity ${operator} ${item.quantity}`)
                        },
                        { where: { userId: user.id, itemId: item.id, warehouseId: item.warehouseId }, transaction }
                    );
                }
            };

            const createInvoiceItems = async (items, addedInvoice) => {
                const invoiceItems = items.map(item => ({
                    ...item,
                    itemId: item.id,
                    invoiceId: addedInvoice.id,
                    userId: user.id
                }));

                return await models.InvoiceItem.bulkCreate(invoiceItems, { transaction });
            };

            // business logic
            try {
                const addedInvoice = await addInvoice();

                for (const item of items) {
                    const [dbItem] = await findOrCreateNewItem(item);

                    if (dbItem) item.id = dbItem.id;
                    else throw Error('Error adding invoice item.');

                    if (item.itemType.slug === 'PRODUCT') {
                        await upsertProduct(item);
                    }
                }

                await createInvoiceItems(items, addedInvoice);

                await transaction.commit();

                return addedInvoice.id;
            } catch (err) {
                await transaction.rollback();
                throw err;
            }
        })
    },
    InvoiceItem: {
        __resolveType: invoiceItem => {
            return invoiceItem.code ? 'ProductInvoiceItem' : 'ExpenseInvoiceItem';
        }
    }
};

export const invoiceItemWhere = (item: InvoiceItemInput, userId) => {
    if (item.itemType.slug === 'PRODUCT') {
        return {
            code: Sequelize.where(Sequelize.fn('lower', Sequelize.col('code')), item.code.toLowerCase()),
            userId
        };
    }

    return {
        name: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), item.name.toLowerCase()),
        userId
    };
};

export default resolver;
