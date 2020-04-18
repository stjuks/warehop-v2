import { Resolver, authResolver } from '.';

const warehouseResolver: Resolver = {
  Query: {
    warehouses: authResolver(async (args, { models, user }) => {
      return await models.Warehouse.findAll({ where: { userId: user.id } });
    })
  },
  Mutation: {
    addWarehouse: authResolver(async ({ name }, { models, user }) => {
      const warehouse = await models.Warehouse.create({ name, userId: user.id });
      return warehouse;
    }),
    deleteWarehouse: authResolver(async ({ id }, { models, user }) => {
      return await models.Warehouse.destroy({ where: { userId: user.id, id } });
    }),
    editWarehouse: authResolver(async ({ id, ...rest }, { models, user }) => {
      const [editedRows] = await models.Warehouse.update(rest, {
        where: { userId: user.id, id },
        returning: true
      });

      return editedRows;
    })
  }
};

export default warehouseResolver;
