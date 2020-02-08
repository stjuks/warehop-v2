import { Op } from 'sequelize';
import { Resolver, authResolver, paginate } from '.';
import { PaginatedQueryInput, SearchPartnerInput } from '@shared/types';

const partnerResolver: Resolver = {
  Query: {
    partners: authResolver(async ({ filter }: { filter: SearchPartnerInput }, { models, user }) => {
      const { type, name, phoneNr, email, generalQuery, pagination } = filter;

      const where: any = { userId: user.id };

      const like = (arg: string) => ({ [Op.like]: `%${arg}%` });

      if (type) where.type = type;

      if (generalQuery) {
        const generalLike = like(generalQuery);

        where[Op.or] = [{ name: generalLike }, { phoneNr: generalLike }, { email: generalLike }];
      } else {
        if (name) where.name = like(name);
        if (phoneNr) where.phoneNr = like(phoneNr);
        if (email) where.email = like(email);
      }

      const cursor = pagination && pagination.cursor;
      const limit = pagination && pagination.limit;

      return await paginate(models.Partner, {
        cursor,
        limit,
        where
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
