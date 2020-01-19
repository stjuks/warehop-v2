import { Resolver, authResolver, paginate } from '.';
import { PaginatedQueryInput } from 'shared/inputTypes';

const partnerResolver: Resolver = {
    Query: {
        partners: authResolver(async ({ pagination: { cursor, limit } }: { pagination: PaginatedQueryInput }, { models, user }) => {
            return await paginate(models.Partner, {
                cursor,
                limit,
                where: { userId: user.id },
                include: [models.PartnerType]
            });
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
            const [editedRows] = await models.Partner.update(partner, {
                where: { id, userId: user.id },
                returning: true
            });

            return editedRows;
        })
    }
};

export default partnerResolver;
