import { DocumentNode, GraphQLError } from 'graphql';
import { gql, ApolloClient, ApolloError } from 'apollo-boost-upload';
import { ErrorCode } from '@shared/types';

interface OnMutateOptions {
  client?: ApolloClient<object>;
  customValues?: any;
  result?: any;
}

interface MutationConfig {
  mutation: string;
  updateCache?: (cache, result) => void;
  onMutate?: (args: OnMutateOptions) => void;
  errorHandler?: ErrorHandler;
}

type ErrorHandler = {
  [key in ErrorCode]?:
    | {
        [key: string]: string;
      }
    | string;
};

export default class Mutation {
  mutation: DocumentNode;

  updateCache?: (cache, result) => void;

  onMutate?: (args: OnMutateOptions) => void;

  errorHandler?: ErrorHandler;

  constructor(config: MutationConfig) {
    this.mutation = gql`
      ${config.mutation}
    `;
    this.updateCache = config.updateCache;
    this.onMutate = config.onMutate;
    this.errorHandler = config.errorHandler;
  }

  parseError = (error?: ApolloError) => {
    return handleError(error, this.errorHandler);
  };
}

export const handleError = (error?: ApolloError, errorHandler?: ErrorHandler) => {
  const messages: string[] = [];

  if (error instanceof ApolloError) {
    const err: GraphQLError = error.graphQLErrors[0];

    console.log(err);

    if (err && err.extensions && errorHandler) {
      const {
        extensions: { code, fields, table },
      } = err;

      const codeMessages = errorHandler[code];

      if (code === 'EntityAlreadyExistsError' && codeMessages) {
        fields.forEach((field: string) => {
          const message = codeMessages[field];
          if (message) messages.push(message);
        });
      }

      if (code === 'DeletionRestrictedError' && codeMessages) {
        const message = codeMessages[table];
        if (message) messages.push(message);
      }

      if (code === 'TriggerExceptionError') {
        messages.push(codeMessages);
      }

      if (messages.length === 0) messages.push('Viga');

      return {
        messages,
        message: err.message,
        ...err.extensions,
      };
    }
  }

  messages.push('Viga');

  return { messages };
};
