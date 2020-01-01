import { Model, Table, Sequelize } from 'sequelize-typescript';
import currency from 'currency.js';

import { Resolver } from '.';

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
    Mutation: {
        addInvoice: async (parent, { invoice }: AddInvoiceInput, { models, sequelize }) => {
            const { items, ...restInvoice } = invoice;

            restInvoice.sum = items
                .reduce<currency>(
                    (acc, item) => currency(acc).add(currency(item.price).multiply(item.quantity)),
                    currency(0)
                )
                .toString();

            const transaction = await sequelize.transaction();

            try {
                const addedInvoice = await models.Invoice.create(
                    { ...restInvoice, invoiceTypeId: invoice.invoiceType.id, userId: 1 },
                    { transaction }
                );

                for (const item of items) {
                    const [dbItem] = await models.Item.findOrCreate({
                        where: invoiceItemWhere(item, 1),
                        defaults: {
                            ...item,
                            userId: 1,
                            partnerId: item.itemType.slug === 'PRODUCT' ? invoice.partnerId : undefined,
                            itemTypeId: item.itemType.id,
                            [invoice.invoiceType.slug === 'PURCHASE' ? 'purchasePrice' : 'retailPrice']: item.price
                        },
                        transaction
                    });

                    if (dbItem) item.id = dbItem.id;
                    else throw Error('Error adding invoice item.');

                    if (item.itemType.slug === 'PRODUCT') {
                        const [, isNewItem] = await models.WarehouseItem.findOrCreate({
                            defaults: { ...item, itemId: item.id, userId: 1 },
                            where: { userId: 1, itemId: item.id },
                            transaction
                        });

                        if (!isNewItem) {
                            const operator = invoice.invoiceType.slug === 'SALE' ? '-' : '+';

                            await models.WarehouseItem.update(
                                {
                                    quantity: Sequelize.literal(`quantity ${operator} ${item.quantity}`)
                                },
                                { where: { userId: 1, itemId: item.id, warehouseId: item.warehouseId }, transaction }
                            );
                        }
                    }
                }

                const invoiceItems = items.map(item => ({
                    ...item,
                    itemId: item.id,
                    invoiceId: addedInvoice.id,
                    [invoice.invoiceType.slug === 'PURCHASE' ? 'purchasePrice' : 'retailPrice']: item.price
                }));

                await models.InvoiceItem.bulkCreate(invoiceItems, { transaction });
                await transaction.commit();

                return addedInvoice.id;
            } catch (err) {
                transaction.rollback();
                throw err;
            }
        }
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
