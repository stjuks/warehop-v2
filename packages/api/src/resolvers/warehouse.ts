import { Resolver } from '.';

const resolver: Resolver = {
    Query: {
        warehouses: async (parent, args, { models }) => {
            return await models.Warehouse.findAll({ where: { userId: 1 } });
        }
    },
    Mutation: {
        addWarehouse: async (parent, { name }, { models }) => {
            const warehouse = await models.Warehouse.create({ name, userId: 1 });
            return warehouse.id;
        },
        deleteWarehouse: async (parent, { id }, { models }) => {
            return await models.Warehouse.destroy({ where: { userId: 1, id } });
        },
        editWarehouse: async (parent, { id, ...rest }, { models }) => {
            const [, [warehouse]] = await models.Warehouse.update(rest, { where: { userId: 1, id }, returning: true });

            return warehouse;
        }
    }
};

export default resolver;
