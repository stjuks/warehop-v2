import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import fs, { unlink } from 'fs';
import currency from 'currency.js';
import mkdirp from 'mkdirp';
import { Op, Model, Transaction } from 'sequelize';
import Joi from '@hapi/joi';

import { Resolver, authResolver, ApolloContext, paginate } from '.';

import { InvoiceSearchInput, AddInvoiceInput } from '@shared/types';
import Invoice from '../db/models/Invoice';

const validateInvoice = Joi.object({
  id: Joi.number().optional(),
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
    addInvoice: authResolver(async ({ invoice }: { invoice: AddInvoiceInput }, context) => {
      const { models, sequelize, user } = context;
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

      const createInvoice = async () => {
        return await models.Invoice.create({ ...restInvoice, userId: user.id }, { transaction });
      };

      // business logic
      try {
        const addedInvoice = await createInvoice();

        await createInvoiceItems(items, addedInvoice, context, transaction);

        await uploadFile(addedInvoice.id);

        await transaction.commit();

        return addedInvoice.id;
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    }, validateInvoice),
    editInvoice: authResolver(
      async ({ id, invoice }: { id: number; invoice: AddInvoiceInput }, context) => {
        const { models, user, sequelize } = context;

        const transaction = await sequelize.transaction();

        if (invoice.type) delete invoice.type;

        invoice.sum = invoice.items
          .reduce<currency>(
            (acc, item) => currency(acc).add(currency(item.price).multiply(item.quantity)),
            currency(0)
          )
          .toString();

        const updateInvoice = async () => {
          const [isUpdated] = await models.Invoice.update(invoice, {
            where: { id, userId: user.id }
          });

          return isUpdated;
        };

        try {
          const isUpdated = await updateInvoice();

          if (isUpdated) {
            await models.InvoiceItem.destroy({
              where: { invoiceId: id, userId: user.id },
              transaction
            });

            await createInvoiceItems(invoice.items, { ...invoice, id }, context, transaction);
          }

          await transaction.commit();
          return true;
        } catch (err) {
          await transaction.rollback();
          throw err;
        }
      },
      validateInvoice
    ),
    deleteInvoice: authResolver(async ({ id }: { id: number }, { user, models }) => {
      try {
        const isDeleted = await models.Invoice.destroy({ where: { userId: user.id, id } });

        return isDeleted;
      } catch (err) {
        throw err;
      }
    }),
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

const createInvoiceItems = async (
  items,
  invoice,
  context: ApolloContext,
  transaction: Transaction
) => {
  const { user, models } = context;

  const findOrCreateNewItem = async item => {
    return await models.Item.findOrCreate({
      where:
        item.type === 'PRODUCT'
          ? {
              code: item.code,
              userId: user.id
            }
          : {
              name: item.name,
              userId: user.id
            },
      defaults: {
        ...item,
        userId: user.id,
        partnerId: item.type === 'PRODUCT' ? invoice.partnerId : undefined,
        [invoice.type === 'PURCHASE' ? 'purchasePrice' : 'retailPrice']: item.price
      },
      transaction
    });
  };

  for (const item of items) {
    const [dbItem] = await findOrCreateNewItem(item);

    if (dbItem) item.id = dbItem.id;
    else throw Error('Error adding invoice item.');
  }

  const invoiceItems = items.map(item => ({
    ...item,
    itemId: item.id,
    invoiceId: invoice.id,
    userId: user.id
  }));

  await models.InvoiceItem.bulkCreate(invoiceItems, { transaction });
};

const findInvoices = async ({ models, user }: ApolloContext, filter: InvoiceSearchInput) => {
  const {
    type,
    pagination,
    number,
    isPaid,
    description,
    partnerName,
    generalQuery,
    isLocked
  } = filter;

  const where: any = {
    userId: user.id,
    type,
    isLocked: isLocked === false ? false : true,
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

export const parseInvoice = (dbInvoice: Model<Invoice>) => {
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

export const findInvoice = async ({ models, user }: ApolloContext, id: number) => {
  const invoice = await models.Invoice.findOne({
    where: {
      id,
      userId: user.id
    },
    // order transactions by date
    order: [[{ model: models.Transaction, as: 'transactions' }, 'date', 'DESC']],
    include: [
      models.Partner,
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
  { models, user }: ApolloContext
) => {
  const updateInvoice = async () => {
    const [updatedRows] = await models.Invoice.update(
      { isLocked },
      { where: { userId: user.id, id }, returning: true }
    );

    return updatedRows;
  };

  try {
    return await updateInvoice();
  } catch (err) {
    throw err;
  }
};

export default resolver;
