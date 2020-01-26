import apollo from '../util/apollo';
import { QueryBaseOptions, MutationOptions, ApolloError } from 'apollo-boost';

import commonApi from './common';
import partnerApi from './partner';
import warehouseApi from './warehouse';
import itemApi from './item';
import invoiceApi from './invoice';
import { GraphQLError } from 'graphql';

export const query = async <T>(opts: QueryBaseOptions) => {
    try {
        const { data } = await apollo.query({ ...opts, fetchPolicy: 'no-cache' });

        const result: T = getResult(data, opts);

        return result;
    } catch (err) {
        handleError(err);
        throw err;
    }
};

export const mutate = async <T>(opts: MutationOptions) => {
    try {
        const { data } = await apollo.mutate(opts);

        const result: T = getResult(data, opts);

        return result;
    } catch (err) {
        handleError(err);
        throw err;
    }
};

const handleError = error => {
    if (error instanceof ApolloError) {
        throw error.graphQLErrors[0];
    }
};

const getResult = (data, opts) => {
    let queryName = '';

    const queryDefinition: any = opts.query ? opts.query.definitions[0] : opts.mutation.definitions[0];
    if (queryDefinition && queryDefinition.name) queryName = queryDefinition.name.value;

    const result = queryName ? data[queryName] : data;

    return result;
};

export default {
    ...commonApi,
    ...partnerApi,
    ...warehouseApi,
    ...itemApi,
    ...invoiceApi
};
