import { Resolver } from '.';

const resolver: Resolver = {
    Query: {
        items: async (parent, args, { models }) => {
            const result: any = await models.Item.findAll({
                where: { userId: 1 },
                include: [
                    models.Partner,
                    models.Unit,
                    models.ItemType,
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
        }
    },
    Mutation: {
        addItem: async (parent, { item }, { models, sequelize }) => {
            const { warehouseQuantity, ...restItem } = item;
            const transaction = await sequelize.transaction();

            try {
                const addedItem = await models.Item.create({ ...restItem, userId: 1 }, { transaction });

                const warehouseItems = warehouseQuantity.map(wh => ({
                    ...wh,
                    warehouseId: wh.id,
                    itemId: addedItem.id,
                    userId: 1
                }));

                await models.WarehouseItem.bulkCreate(warehouseItems, { transaction });
                await transaction.commit();

                return addedItem.id;
            } catch (err) {
                await transaction.rollback();
                throw err;
            }
        },
        deleteItem: async (parent, { id }, { models }) => {
            return await models.Item.destroy({ where: { id, userId: 1 } });
        },
        editItem: async (parent, { id, item }, { models }) => {
            const [, [editedItem]] = await models.Item.update(item, {
                where: { id, userId: 1 },
                returning: true
            });

            return editedItem;
        }
    }
};

export default resolver;
