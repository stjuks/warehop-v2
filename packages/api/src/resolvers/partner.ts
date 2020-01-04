import { Resolver, authResolver } from '.';

const partnerResolver: Resolver = {
    Query: {
        partners: authResolver(async (args, { models, user }) => {
            return await models.Partner.findAll({ where: { userId: user.id }, include: [models.PartnerType] });
        })
    },
    Mutation: {
        addPartner: authResolver(async ({ partner }, { models, user }) => {
            const addedPartner = await models.Partner.create({ ...partner, userId: user.id });
            return addedPartner.id;
        }),
        deletePartner: authResolver(async ({ id }, { models, user }) => {
            return await models.Partner.destroy({ where: { id, userId: user.id } });
        }),
        editPartner: authResolver(async ({ id, partner }, { models, user }) => {
            const [, [editedPartner]] = await models.Partner.update(partner, {
                where: { id, userId: user.id },
                returning: true
            });

            return editedPartner;
        })
    }
};

export default partnerResolver;
