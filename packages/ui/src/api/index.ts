import apollo from '../util/apollo';
import { QueryBaseOptions, MutationOptions, ApolloError, gql } from 'apollo-boost-upload';

import commonApi from './common';
import partnerApi from './partner';
import warehouseApi from './warehouse';
import itemApi from './item';
import invoiceApi from './invoice';
import transactionApi from './transaction';
import { omitDeep } from '@ui/util/helpers';

import { GraphQLError } from 'graphql';
import { ErrorCode } from '@shared/types';

interface ErrorOptions {
  errorMessageHandler: {
    [key in ErrorCode]?: {
      [key: string]: string;
    };
  };
}

export const query = async <T>(opts: QueryBaseOptions, errorOptions?: ErrorOptions) => {
  try {
    const { data } = await apollo.query({ ...opts, fetchPolicy: 'no-cache' });

    const result: T = getResult(data, opts);

    return result;
  } catch (err) {
    throw handleError(err, errorOptions);
  }
};

export const mutate = async <T>(opts: MutationOptions, errorOptions?: ErrorOptions) => {
  try {
    const { data } = await apollo.mutate(opts);

    const result: T = getResult(data, opts);

    return result;
  } catch (err) {
    throw handleError(err, errorOptions);
  }
};

const handleError = (error, options?: ErrorOptions) => {
  if (error instanceof ApolloError) {
    const err: GraphQLError = error.graphQLErrors[0];

    if (err) {
      return {
        message: err.message,
        ...err.extensions
      };
    }
  }

  throw error;
};

const getResult = (data, opts) => {
  let queryName = '';

  const queryDefinition: any = opts.query
    ? opts.query.definitions[0]
    : opts.mutation.definitions[0];
  if (queryDefinition && queryDefinition.name) queryName = queryDefinition.name.value;

  let result = queryName ? data[queryName] : data;
  result = omitDeep(result, '__typename');

  return result;
};

export default {
  ...commonApi,
  ...partnerApi,
  ...warehouseApi,
  ...itemApi,
  ...invoiceApi,
  ...transactionApi
};
