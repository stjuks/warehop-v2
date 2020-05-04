import { Resolver, authResolver, ApolloContext, paginate } from '.';
import { ItemType, ItemInput, PaginatedQueryInput, ItemQueryInput } from '@shared/types';
import { Op } from 'sequelize';

const resolver: Resolver = {
  Query: {
    products: authResolver(async ({ filter }: { filter: ItemQueryInput }, context) => {
      return await findItems(context, { ...filter, type: 'PRODUCT' });
    }),
    services: authResolver(async ({ filter }: { filter: ItemQueryInput }, context) => {
      return await findItems(context, { ...filter, type: 'SERVICE' });
    }),
    product: authResolver(async ({ id }: { id: number }, { models, user }) => {
      const item = await models.Item.findOne({
        where: { id, userId: user.id },
        include: [
          models.Partner,
          models.Unit,
          { model: models.Warehouse, through: {}, as: 'warehouseQuantity' }
        ]
      });

      return parseItem(item);
    })
  },
  Mutation: {
    addItem: authResolver(async ({ item }: { item: ItemInput }, { models, sequelize, user }) => {
      const { warehouseQuantity, ...restItem } = item;
      const transaction = await sequelize.transaction();

      try {
        const addedItem = await models.Item.create(
          { ...restItem, userId: user.id },
          { transaction }
        );

        const warehouseItems = warehouseQuantity.map(wh => ({
          ...wh,
          warehouseId: wh.id,
          itemId: addedItem.id,
          userId: user.id
        }));

        await models.WarehouseItem.bulkCreate(warehouseItems, { transaction });
        await transaction.commit();

        return addedItem.id;
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    }),
    deleteItem: authResolver(async ({ id }, { models, user }) => {
      // const transaction = await sequelize.transaction();
      return await models.Item.destroy({ where: { id, userId: user.id } });
    }),
    editItem: authResolver(
      async ({ id, item }: { id: number; item: ItemInput }, { models, user, sequelize }) => {
        const transaction = await sequelize.transaction();

        try {
          const [isEdited] = await models.Item.update(item, {
            where: { id, userId: user.id },
            transaction
          });

          if (isEdited) {
            console.log('1');
            await models.WarehouseItem.destroy({
              where: { itemId: id, userId: user.id },
              transaction
            });
            console.log('2');

            await models.WarehouseItem.bulkCreate(
              item.warehouseQuantity.map(quantity => ({
                ...quantity,
                itemId: id,
                userId: user.id,
                warehouseId: quantity.id
              })),
              {
                transaction
              }
            );
            console.log('3');

            await transaction.commit();

            return isEdited;
          }

          throw new Error('No such item.');
        } catch (err) {
          transaction.rollback();
          throw err;
        }
      }
    )
  },
  Item: {
    __resolveType: item => (item.type === 'PRODUCT' ? 'ProductItem' : 'ExpenseItem')
  }
};

const findItems = async ({ models, user }: ApolloContext, filter: ItemQueryInput) => {
  const {
    type,
    pagination: { cursor, limit },
    name,
    code,
    description,
    generalQuery,
    warehouseId
  } = filter;
  const where: any = { userId: user.id, type };

  const like = query => ({ [Op.like]: `%${query}%` });

  if (generalQuery) {
    where[Op.or] = [
      { name: like(generalQuery) },
      { code: like(generalQuery) },
      { description: like(generalQuery) }
    ];
  } else {
    if (name) where.name = like(name);
    if (code) where.code = like(code);
    if (description) where.description = like(description);
  }

  const warehouseWhere: any = {};

  if (warehouseId) warehouseWhere.id = warehouseId;

  const result = await paginate(models.Item, {
    cursor,
    limit,
    where,
    include: [
      models.Partner,
      models.Unit,
      { model: models.Warehouse, through: {}, as: 'warehouseQuantity', where: warehouseWhere }
    ]
  });

  result.data = result.data.map(parseItem);

  return result;
};

const parseItem = item => {
  if (item) {
    item = item.get({ plain: true });

    item.warehouseQuantity = item.warehouseQuantity.map(wh => {
      return {
        ...wh,
        quantity: wh.WarehouseItem.quantity
      };
    });

    return item;
  }

  return null;
};

export default resolver;
