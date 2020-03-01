import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import fs, { unlink } from 'fs';
import currency from 'currency.js';
import mkdirp from 'mkdirp';
import util from 'util';
import { Op, Model, Utils } from 'sequelize';
import Joi from '@hapi/joi';

import { Resolver, authResolver, ApolloContext, paginate } from '.';

import {
  InvoiceType,
  InvoiceSearchInput,
  AddInvoiceInput,
  InvoiceItemInput,
  PaginatedQueryInput
} from '@shared/types';
import Invoice from '../db/models/Invoice';
import { GraphQLUpload } from 'apollo-server-express';
import db from '../db';

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
          code: Joi.when('type', {
            is: 'PRODUCT',
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
          })
        })
      )
      .required()
  }).unknown()
}).required();

const resolver: Resolver = {
  Query: {
    invoice: authResolver(async ({ id }, context) => {
      return await findInvoice(context, id);
    }),
    purchases: authResolver(async ({ filter }: { filter: InvoiceSearchInput }, context) => {
      console.log(filter);
      return await findInvoices(context, { ...filter, type: 'PURCHASE' });
    }),
    sales: authResolver(async ({ filter }: { filter: InvoiceSearchInput }, context) => {
      return await findInvoices(context, { ...filter, type: 'SALE' });
    }),
    invoiceItems: authResolver(async ({ invoiceId }, { models, user }) => {
      const invoiceItems = await models.InvoiceItem.findAll({
        where: {
          userId: user.id,
          invoiceId
        },
        include: [
          { model: models.Item, attributes: ['id', 'code', 'type'] },
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
    addInvoice: authResolver(
      async ({ invoice }: { invoice: AddInvoiceInput }, { models, sequelize, user }) => {
        const { items, file, ...restInvoice } = invoice;

        restInvoice.sum = items
          .reduce<currency>(
            (acc, item) => currency(acc).add(currency(item.price).multiply(item.quantity)),
            currency(0)
          )
          .toString();

        const transaction = await sequelize.transaction();

        const uploadFile = async invoiceId => {
          if (file && invoice.type === 'PURCHASE') {
            const { createReadStream, filename }: any = await file;
            const stream = createReadStream();

            const uploadDir = path.join('..', '..', 'purchaseUploads');
            const fileName = `${new Date().getTime()}-${filename}`;
            const filePath = path.join(uploadDir, fileName);

            await mkdirp(uploadDir);

            await new Promise((resolve, reject) => {
              const wStream = fs.createWriteStream(filePath);

              wStream.on('finish', resolve);
              wStream.on('error', error => fs.unlink(filePath, () => reject(error)));

              stream.on('error', error => wStream.destroy(error));
              stream.pipe(wStream);
            });

            await models.Invoice.update(
              { filePath: fileName },
              { where: { id: invoiceId }, transaction }
            );
          }
        };

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
          }

          await createInvoiceItems(items, addedInvoice);

          await uploadFile(addedInvoice.id);

          await transaction.commit();

          return addedInvoice.id;
        } catch (err) {
          await transaction.rollback();
          throw err;
        }
      },
      validateAddInvoice
    ),
    lockInvoice: authResolver(async ({ id }: { id: number }, context) => {
      return await handleInvoiceLock({ id, isLocked: true }, context);
    }),
    unlockInvoice: authResolver(async ({ id }: { id: number }, context) => {
      return await handleInvoiceLock({ id, isLocked: false }, context);
    })
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

const findInvoices = async ({ models, user }: ApolloContext, filter: InvoiceSearchInput) => {
  const { type, pagination, number, isPaid, description, partnerName, generalQuery } = filter;

  const where: any = {
    userId: user.id,
    type,
    partner: {}
  };

  const cursor = pagination && pagination.cursor;
  const limit = pagination && pagination.limit;

  if (generalQuery) {
    const generalLike = { [Op.like]: `%${generalQuery}%` };
    where[Op.or] = [
      { number: generalLike },
      { description: generalLike },
      { '$partner.name$': generalLike }
    ];
  } else {
    if (number) where.number = { [Op.like]: `%${number}%` };
    if (description) where.description = { [Op.like]: `%${description}%` };
  }

  if (partnerName) where.partner.name = { [Op.like]: `%${partnerName}%` };
  if (isPaid === true) where.sum = { [Op.lte]: Sequelize.col('paidSum') };
  if (isPaid === false) where.sum = { [Op.gt]: Sequelize.col('paidSum') };

  const { partner, ...restWhere } = where;

  const invoices = await paginate(models.Invoice, {
    cursor,
    limit,
    paginateBy: 'dueDate',
    where: restWhere,
    include: [
      {
        model: models.Partner,
        where: where.partner
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
    order: [
      ['dueDate', 'ASC'],
      [{ model: models.Transaction, as: 'transactions' }, 'date', 'DESC']
    ],
    attributes: [
      'id',
      'type',
      'number',
      'dueDate',
      'issueDate',
      'sum',
      'description',
      'filePath',
      'paidSum',
      'isLocked'
    ]
  });

  invoices.data = invoices.data.map(parseInvoice);

  return invoices;
};

const parseInvoice = (dbInvoice: Model<Invoice>) => {
  if (dbInvoice) {
    const plainInvoice: any = dbInvoice.get({ plain: true });

    plainInvoice.items = plainInvoice.items.map(item => {
      return {
        ...item.item,
        ...item,
        id: item.itemId
      };
    });

    plainInvoice.isPaid = Number(plainInvoice.paidSum) >= Number(plainInvoice.sum);

    return plainInvoice;
  }

  return null;
};

const findInvoice = async ({ models, user }: ApolloContext, id: number) => {
  const invoice = await models.Invoice.findOne({
    where: {
      id,
      userId: user.id
    },
    // order transactions by date
    order: [[{ model: models.Transaction, as: 'transactions' }, 'date', 'DESC']],
    include: [
      {
        model: models.Partner
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
    attributes: [
      'id',
      'type',
      'number',
      'dueDate',
      'issueDate',
      'sum',
      'description',
      'filePath',
      'paidSum',
      'isLocked'
    ]
  });

  return parseInvoice(invoice);
};

const handleInvoiceLock = async (
  { id, isLocked }: { id: number; isLocked: boolean },
  { models, user, sequelize }: ApolloContext
) => {
  const transaction = await sequelize.transaction();

  const updateInvoice = async () => {
    const [, [invoice]] = await models.Invoice.update(
      { isLocked },
      { where: { userId: user.id, id }, returning: true, transaction }
    );

    return invoice;
  };

  const findInvoiceItems: any = async invoice => {
    const invoiceItems = await models.InvoiceItem.findAll({
      where: {
        invoiceId: invoice.id,
        userId: user.id
      },
      attributes: ['warehouseId', 'itemId', 'quantity'],
      transaction
    });

    return invoiceItems.map(item => item.get({ plain: true }));
  };

  const upsertWarehouseItem = async (item, invoice) => {
    const [, isNewItem] = await models.WarehouseItem.findOrCreate({
      defaults: { ...item, userId: user.id },
      where: { userId: user.id, itemId: item.itemId, warehouseId: item.warehouseId },
      transaction
    });

    if (isNewItem && invoice.type === 'SALE') {
      throw Error(`Item "${item.name}" does not exist in specified warehouse.`);
    }

    if (!isNewItem) {
      let operator = '+';

      if ((invoice.type === 'SALE' && isLocked) || (invoice.type === 'PURCHASE' && !isLocked))
        operator = '-';

      await models.WarehouseItem.update(
        {
          quantity: Sequelize.literal(`quantity ${operator} ${item.quantity}`)
        },
        {
          where: { userId: user.id, itemId: item.itemId, warehouseId: item.warehouseId },
          transaction
        }
      );
    }
  };

  try {
    const invoice = await updateInvoice();

    const invoiceItems = await findInvoiceItems(invoice);

    for (const item of invoiceItems) {
      if (item.warehouseId) {
        await upsertWarehouseItem(item, invoice);
      }
    }

    await transaction.commit();

    return true;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

export default resolver;
