import { DocumentNode } from 'graphql';
import { gql } from 'apollo-boost-upload';

interface MutationConfig<T> {
  mutation: string;
  updateCache: (cache, result) => void;
}

export default class Mutation<T> {
  mutation: DocumentNode;

  updateCache: (cache, result) => void;

  constructor(config: MutationConfig<T>) {
    this.mutation = gql`
      ${config.mutation}
    `;
    this.updateCache = config.updateCache;
  }
}
