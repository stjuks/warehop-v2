import { Model, Table } from 'sequelize-typescript';
import { Resolver, authResolver } from '.';
import User from '../db/models/User';

const resolver: Resolver = {
    Query: {
        units: authResolver(async (_args, { models, user }) => {
            return await models.Unit.findAll({ where: { userId: user.id } });
        })
    },
    Mutation: {
        addUnit: authResolver(async ({ name, abbreviation }, { models, user }) => {
            return await models.Unit.create({ name, abbreviation, userId: user.id });
        }),
        deleteUnit: authResolver(async ({ id }, { models, user }) => {
            return await models.Unit.destroy({ where: { id, userId: user.id } });
        }),
        editUnit: authResolver(async ({ id, ...rest }, { models, user }) => {
            const [, [unit]] = await models.Unit.update(rest, { where: { id, userId: user.id }, returning: true });

            return unit;
        })
    }
};

export default resolver;
