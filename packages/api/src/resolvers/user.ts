import { Model, Table } from 'sequelize-typescript';
import { Resolver } from '.';
import User from '../db/models/User';

const resolver: Resolver = {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll();
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findOne({ where: { id } });
        }
    },
    Mutation: {
        signUp: async (parent, { name }, { models }) => {
            const createdUser = await models.User.create({ name });

            return createdUser;
        }
    }
};

export default resolver;
