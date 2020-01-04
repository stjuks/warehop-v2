import { Resolver, authResolver } from '.';

const resolver: Resolver = {
    Query: {
        items: authResolver(async (_args, { models, user }) => {
            const result: any = await models.Item.findAll({
                where: { userId: user.id },
                include: [
                    models.Partner,
                    models.Unit,
                    { model: models.Warehouse, through: {}, as: 'warehouseQuantity' }
                ]
            });

            const parsedResult = result.map(i => {
                const item: any = i.get({ plain: true });

                item.warehouseQuantity = item.warehouseQuantity.map(wh => {
                    return {
                        ...wh,
                        quantity: wh.WarehouseItem.quantity
                    };
                });

                return item;
            });

            return parsedResult;
        })
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
    }
};

export default resolver;
