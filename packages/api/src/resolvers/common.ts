import { Model, Table } from 'sequelize-typescript';
import { Resolver } from '.';
import User from '../db/models/User';

const resolver: Resolver = {
    Query: {
        units: async (parent, args, { models }) => {
            return await models.Unit.findAll({ where: { userId: 1 } });
        }
    },
    Mutation: {
        addUnit: async (parent, { name, abbreviation }, { models }) => {
            return await models.Unit.create({ name, abbreviation, userId: 1 });
        },
        deleteUnit: async (parent, { id }, { models }) => {
            return await models.Unit.destroy({ where: { id, userId: 1 } });
        },
        editUnit: async (parent, { id, ...rest }, { models }) => {
            const [, [unit]] = await models.Unit.update(rest, { where: { id, userId: 1 }, returning: true });

            return unit;
        }
    }
};

export default resolver;
