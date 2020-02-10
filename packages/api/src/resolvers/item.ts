import { Resolver, authResolver, ApolloContext, paginate } from '.';
import { ItemType, ItemInput, PaginatedQueryInput, ItemQueryInput } from '@shared/types';
import { Op } from 'sequelize';

interface ItemSearchInput {
  query: {
    type: ItemType;
    code?: string;
    name?: string;
    description?: string;
    generalQuery?: string;
  };
}

const resolver: Resolver = {
  Query: {
    products: authResolver(async ({ filter }: { filter: ItemQueryInput }, context) => {
      return await findItems(context, { ...filter, type: 'PRODUCT' });
    }),
    services: authResolver(async ({ filter }: { filter: ItemQueryInput }, context) => {
      return await findItems(context, { ...filter, type: 'SERVICE' });
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
      return await models.Item.destroy({ where: { id, userId: user.id } });
    }),
    editItem: authResolver(async ({ id, item }, { models, user }) => {
      const [, [editedItem]] = await models.Item.update(item, {
        where: { id, userId: user.id },
        returning: true
      });

      return editedItem;
    })
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
    generalQuery
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

  const result = await paginate(models.Item, {
    cursor,
    limit,
    where,
    include: [
      models.Partner,
      models.Unit,
      { model: models.Warehouse, through: {}, as: 'warehouseQuantity' }
    ]
  });

  result.data = result.data.map(i => {
    const item: any = i.get({ plain: true });

    item.warehouseQuantity = item.warehouseQuantity.map(wh => {
      return {
        ...wh,
        quantity: wh.WarehouseItem.quantity
      };
    });

    return item;
  });

  return result;
};

export default resolver;
