import { Resolver } from '.';

const resolver: Resolver = {
    Query: {
        partners: async (parent, args, { models }) => {
            return await models.Partner.findAll({ where: { userId: 1 }, include: [models.PartnerType] });
        }
    },
    Mutation: {
        addPartner: async (parent, { partner }, { models }) => {
            return await models.Partner.create({ ...partner, userId: 1 });
        },
        deletePartner: async (parent, { id }, { models }) => {
            return await models.Partner.destroy({ where: { id, userId: 1 } });
        },
        editPartner: async (parent, { id, partner }, { models }) => {
            const [, [editedPartner]] = await models.Partner.update(partner, {
                where: { id, userId: 1 },
                returning: true
            });

            return editedPartner;
        }
    }
};

export default resolver;
