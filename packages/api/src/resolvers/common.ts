import { Resolver, authResolver } from '.';

const resolver: Resolver = {
  Query: {
    units: authResolver(async (_args, { models, user }) => {
      return await models.Unit.findAll({ where: { userId: user.id } });
    }),
    types: authResolver(async (_args, { models, user }) => {
      const itemTypes = await models.ItemType.findAll();
      const partnerTypes = await models.PartnerType.findAll();
      const invoiceTypes = await models.InvoiceType.findAll();

      return {
        itemTypes: itemTypes.map(type => type.id),
        partnerTypes: partnerTypes.map(type => type.id),
        invoiceTypes: invoiceTypes.map(type => type.id)
      };
    })
  },
  Mutation: {
    addUnit: authResolver(async ({ name, abbreviation }, { models, user }) => {
      const addedUnit = await models.Unit.create({ name, abbreviation, userId: user.id });
      return addedUnit.id;
    }),
    deleteUnit: authResolver(async ({ id }, { models, user }) => {
      return await models.Unit.destroy({ where: { id, userId: user.id } });
    }),
    editUnit: authResolver(async ({ id, ...rest }, { models, user }) => {
      const [, [unit]] = await models.Unit.update(rest, {
        where: { id, userId: user.id },
        returning: true
      });

      return unit;
    })
  }
};

export default resolver;
