import { Resolver, authResolver, ApolloContext, PaginatedQueryInput, paginate } from '.';
import { ItemType } from 'shared/types';
import { Op } from 'sequelize';
import { number } from 'joi';

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
        products: authResolver(async ({ pagination: { cursor, limit } }: PaginatedQueryInput, context) => {
            return await findItems(context, { type: 'PRODUCT', limit, cursor });
        }),
        services: authResolver(async ({ pagination: { cursor, limit } }: PaginatedQueryInput, context) => {
            return await findItems(context, { type: 'SERVICE', limit, cursor });
        }),
        searchItems: authResolver(
            async ({ query: { type, name, description, code, generalQuery } }: ItemSearchInput, context) => {
                const { user } = context;

                const where: any = {
                    userId: user.id,
                    type
                };

                if (generalQuery) {
                    const generalLike = { [Op.iLike]: `%${generalQuery}%` };
                    where[Op.or] = [{ name: generalLike }, { code: generalLike }, { description: generalLike }];
                } else {
                    if (name) where.name = { [Op.iLike]: `%${name}%` };
                    if (description) where.description = { [Op.iLike]: `%${description}%` };
                    if (code) where.code = { [Op.iLike]: `%${code}%` };
                }

                return await findItems(context, { where });
            }
        )
    },
    Mutation: {
        addItem: authResolver(async ({ item }, { models, sequelize, user }) => {
            const { warehouseQuantity, ...restItem } = item;
            const transaction = await sequelize.transaction();

            try {
                const addedItem = await models.Item.create({ ...restItem, userId: user.id }, { transaction });

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

const findItems = async (
    { models, user }: ApolloContext,
    opts: { type?: ItemType; where?: any; limit?: number; cursor?: string }
) => {
    const { type, cursor, limit } = opts;
    const where: any = opts.where || { userId: user.id };

    if (type) where.type = type;

    const result = await paginate(models.Item, {
        cursor,
        limit,
        where,
        include: [models.Partner, models.Unit, { model: models.Warehouse, through: {}, as: 'warehouseQuantity' }]
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
