import { DocumentNode } from 'graphql';
import { gql } from 'apollo-boost-upload';

interface QueryConfig<T> {
  query: string;
  onFetchMore?: (prevResult: T, newResult: T) => T;
}

export default class Query<T> {
  query: DocumentNode;

  onFetchMore?: (prevResult: T, newResult: T) => void;

  constructor(config: QueryConfig<T>) {
    this.query = gql`
      ${config.query}
    `;
    this.onFetchMore = config.onFetchMore;
  }
}
