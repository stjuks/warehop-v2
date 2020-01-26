import { ApolloServer, UserInputError, ValidationError, ApolloError } from 'apollo-server-express';
import util from 'util';

import schema from '../schema';
import sequelize from '../db/sequelize';
import models from '../db/models';
import resolvers from '../resolvers';
import { Application } from 'express';
import { UniqueConstraintError, ValidationError as SequelizeValidationError } from 'sequelize';
// import UniqueError from 'shared/errors/UniqueError';

interface ErrorItem {
    fields: string[];
    type: 'unique';
}

const errorCodes = {
    ALREADY_EXISTS: 'ALREADY_EXISTS'
};

const apollo = new ApolloServer({
    playground: true,
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        return { models, sequelize, req, res };
    },
    formatError: err => {
        const exception = err.extensions.exception;
        const result: ErrorItem[] = [];

        if (exception && exception.name) {
            if (exception.name === 'SequelizeUniqueConstraintError') {
                const validationError: SequelizeValidationError = exception;

                result.push();

                /* return new UniqueError('Entity with these attributes already exists.', errorCodes.ALREADY_EXISTS, {
                    fields: validationError.errors.map(error => error.path),
                    type: 'unique'
                }); */

                const error = new ApolloError(
                    'Entity with these attributes already exists.',
                    errorCodes.ALREADY_EXISTS,
                    {
                        fields: validationError.errors.map(error => error.path),
                        type: 'unique'
                    }
                );

                console.error(error);

                return error;
            }
        }

        return { ...err, fields: result };
    }
});

export default {
    initialize: (opts: { app: Application; path: string }) => apollo.applyMiddleware(opts)
};
