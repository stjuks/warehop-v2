import { DocumentNode } from 'graphql';
import { gql, ApolloClient } from 'apollo-boost-upload';

interface OnMutateOptions {
  client?: ApolloClient<object>;
  customValues?: any;
  result?: any;
}

interface MutationConfig {
  mutation: string;
  updateCache?: (cache, result) => void;
  onMutate?: (args: OnMutateOptions) => void;
}

export default class Mutation {
  mutation: DocumentNode;

  updateCache?: (cache, result) => void;

  onMutate?: (args: OnMutateOptions) => void;

  constructor(config: MutationConfig) {
    this.mutation = gql`
      ${config.mutation}
    `;
    this.updateCache = config.updateCache;
    this.onMutate = config.onMutate;
  }
}
