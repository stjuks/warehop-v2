import { Op } from 'sequelize';
import { Resolver, authResolver, paginate } from '.';
import { PaginatedQueryInput, SearchPartnerInput } from '@shared/types';

const partnerResolver: Resolver = {
    Query: {
        partners: authResolver(
            async ({ pagination: { cursor, limit } }: { pagination: PaginatedQueryInput }, { models, user }) => {
                return await paginate(models.Partner, {
                    cursor,
                    limit,
                    where: { userId: user.id },
                    include: [models.PartnerType]
                });
            }
        ),
        searchPartners: authResolver(async ({ query }: { query: SearchPartnerInput }, { models, user }) => {
            const { type, name, phoneNr, email, generalQuery } = query;

            const where: any = { type, userId: user.id };

            const like = (arg: string) => ({ [Op.like]: `%${arg}%` });

            if (generalQuery) {
                const generalLike = like(generalQuery);

                where[Op.or] = [{ name: generalLike }, { phoneNr: generalLike }, { email: generalLike }];
            } else {
                if (name) where.name = like(name);
                if (phoneNr) where.phoneNr = like(phoneNr);
                if (email) where.email = like(email);
            }

            return await models.Partner.findAll({ where });
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
