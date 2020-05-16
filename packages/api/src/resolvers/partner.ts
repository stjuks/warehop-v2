import { Op } from 'sequelize';
import { Resolver, authResolver, paginate } from '.';
import cheerio from 'cheerio';
import qs from 'querystring';
import axios from 'axios';
import { PaginatedQueryInput, SearchPartnerInput, CreditInfoPartner } from '@shared/types';
import { httpsRequest } from '../util/helpers';
import { cachedDataVersionTag } from 'v8';

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
    }),
    searchCreditInfo: authResolver(async ({ query }: { query: string }) => {
      try {
        const { data } = await axios.post(
          'https://www.e-krediidiinfo.ee/companies/search',
          qs.stringify({ action: 'getData' }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json, text/javascript, */*; q=0.01',
              'X-Requested-With': 'XMLHttpRequest'
            },
            params: {
              q: query,
              dtn: 'otsing.ettevotted',
              page_length: 10,
              page_no: 1
            }
          }
        );

        const result = data.map(partner => ({
          name: partner[0]
            ? cheerio
                .load(partner[0])('a')
                .text()
                .trim()
            : null,
          regNr: partner[1] || null,
          address: partner[2] || null,
          phoneNr: partner[3] || null,
          email: partner[4]
            ? cheerio
                .load(partner[4])('a')
                .text()
                .trim()
            : null,
          homepage: partner[5] || null,
          VATnr: partner[6] || null
        }));

        return result;
      } catch (err) {
        throw err;
      }
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
