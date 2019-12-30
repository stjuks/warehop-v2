import { Resolver } from '.';

const resolver: Resolver = {
    Query: {
        items: async (parent, args, { models }) => {
            return await models.Item.findAll({
                where: { userId: 1 },
                include: [models.Partner, models.Unit, models.ItemType]
            });
        }
    },
    Mutation: {
        addItem: async (parent, { item }, { models }) => {
            return await models.Item.create({ ...item, userId: 1 });
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
