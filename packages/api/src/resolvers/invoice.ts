import { Sequelize } from 'sequelize-typescript';
import currency from 'currency.js';
import { Op } from 'sequelize';
import Joi from '@hapi/joi';

import { Resolver, authResolver, ApolloContext, paginate } from '.';

import { InvoiceType } from 'shared/types';
import { InvoiceSearchInput, AddInvoiceInput, InvoiceItemInput, PaginatedQueryInput } from 'shared/inputTypes';

const validateAddInvoice = Joi.object({
    invoice: Joi.object({
        items: Joi.array()
            .items(
                Joi.object({
                    type: Joi.string()
                        .valid('PRODUCT', 'SERVICE', 'EXPENSE')
                        .required(),
                    quantity: Joi.number().required(),
                    price: Joi.string().required(),
                    name: Joi.string().required(),
                    warehouseId: Joi.when('type', {
                        is: 'PRODUCT',
                        then: Joi.number().required(),
                        otherwise: Joi.forbidden()
                    }),
                    unitId: Joi.number().when('type', { is: 'PRODUCT', then: Joi.required() }),
                    code: Joi.when('type', { is: 'PRODUCT', then: Joi.string().required(), otherwise: Joi.forbidden() })
                })
            )
            .required()
    }).unknown()
}).required();

const resolver: Resolver = {
    Query: {
        purchases: authResolver(
            async ({ pagination: { cursor, limit } }: { pagination: PaginatedQueryInput }, context) => {
                return await findInvoices(context, { type: 'PURCHASE', cursor, limit });
            }
        ),
        sales: authResolver(async ({ pagination: { cursor, limit } }: { pagination: PaginatedQueryInput }, context) => {
            return await findInvoices(context, { type: 'SALE', cursor, limit });
        }),
        searchInvoices: authResolver(async ({ query }: { query: InvoiceSearchInput }, context) => {
            const { user } = context;
            const { type, number, description, partnerName, isPaid, generalQuery } = query;

            const where: any = {
                userId: user.id,
                type,
                partner: {}
            };

            if (generalQuery) {
                const generalLike = { [Op.like]: `%${generalQuery}%` };
                where[Op.or] = [{ number: generalLike }, { description: generalLike }];
            } else {
                if (number) where.number = { [Op.like]: `%${number}%` };
                if (description) where.description = { [Op.like]: `%${description}%` };
            }

            if (partnerName) where.partner.name = { [Op.like]: `%${partnerName}%` };
            if (isPaid === true) where.sum = { [Op.lte]: Sequelize.col('paidSum') };
            if (isPaid === false) where.sum = { [Op.gt]: Sequelize.col('paidSum') };

            return await findInvoices(context, { where });
        }),
        invoiceItems: authResolver(async ({ invoiceId }, { models, user }) => {
            const invoiceItems = await models.InvoiceItem.findAll({
                where: {
                    userId: user.id,
                    invoiceId
                },
                include: [{ model: models.Item, attributes: ['id', 'code', 'type'] }, models.Unit, models.Warehouse],
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
        addInvoice: authResolver(async ({ invoice }: { invoice: AddInvoiceInput }, { models, sequelize, user }) => {
            const { items, ...restInvoice } = invoice;

            restInvoice.sum = items
                .reduce<currency>(
                    (acc, item) => currency(acc).add(currency(item.price).multiply(item.quantity)),
                    currency(0)
                )
                .toString();

            const transaction = await sequelize.transaction();

            const addInvoice = async () => {
                return await models.Invoice.create({ ...restInvoice, userId: user.id }, { transaction });
            };

            const findOrCreateNewItem = async item => {
                return await models.Item.findOrCreate({
                    where: invoiceItemWhere(item, user.id),
                    defaults: {
                        ...item,
                        userId: user.id,
                        partnerId: item.type === 'PRODUCT' ? invoice.partnerId : undefined,
                        [invoice.type === 'PURCHASE' ? 'purchasePrice' : 'retailPrice']: item.price
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

                if (isNewItem && invoice.type === 'SALE') {
                    throw Error(`Item "${item.name}" does not exist in specified warehouse.`);
                }

                if (!isNewItem) {
                    const operator = invoice.type === 'SALE' ? '-' : '+';

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

                    if (item.type === 'PRODUCT') {
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
        }, validateAddInvoice)
    },
    InvoiceItem: {
        __resolveType: invoiceItem => {
            return invoiceItem.code ? 'ProductInvoiceItem' : 'ExpenseInvoiceItem';
        }
    }
};

const invoiceItemWhere = (item: InvoiceItemInput, userId) => {
    return item.type === 'PRODUCT'
        ? {
              code: item.code,
              userId
          }
        : {
              name: item.name,
              userId
          };
};

const findInvoices = async (
    { models, user }: ApolloContext,
    opts: {
        type?: InvoiceType;
        where?: { [key: string]: any; partner: { [key: string]: any } };
        limit?: number;
        cursor?: string;
    }
) => {
    const { type, cursor, limit } = opts;

    let where: any = { userId: user.id, type };

    if (opts.where) {
        const { partner, ...restWhere } = opts.where;
        where = restWhere;
    }

    const invoices = await paginate(models.Invoice, {
        cursor,
        limit,
        where,
        include: [
            {
                model: models.Partner,
                where: opts.where && opts.where.partner
            },
            {
                model: models.InvoiceItem,
                as: 'items',
                include: [models.Warehouse, models.Unit, models.Item],
                attributes: ['itemId', 'name', 'quantity', 'price']
            },
            {
                model: models.Transaction,
                as: 'transactions',
                attributes: ['id', 'sum', 'date', 'description']
            }
        ],
        attributes: ['id', 'type', 'number', 'dueDate', 'issueDate', 'sum', 'description', 'filePath', 'paidSum']
    });

    invoices.data = invoices.data.map(invoice => {
        const plainInvoice: any = invoice.get({ plain: true });

        plainInvoice.items = plainInvoice.items.map(item => {
            return {
                ...item.item,
                ...item,
                id: item.itemId
            };
        });

        plainInvoice.isPaid = Number(plainInvoice.paidSum) >= Number(plainInvoice.sum);

        return plainInvoice;
    });

    return invoices;
};

export default resolver;
