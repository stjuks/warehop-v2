import { DocumentNode } from 'graphql';
import { gql, FetchMoreQueryOptions } from 'apollo-boost-upload';

interface QueryConfig<T> {
  query: string;
  onFetchMore?: (prevResult: T, newResult: T) => any;
  transformResult?: (result: any) => any;
  fetchMoreOptions?: (data: T, variables: any) => Partial<FetchMoreQueryOptions<any, any>>;
}

export default class Query<T> {
  query: DocumentNode;

  onFetchMore?: (prevResult: T, newResult: T) => void;

  transformResult?: (result: any) => any;

  fetchMoreOptions?: (data: T, variables: any) => Partial<FetchMoreQueryOptions<any, any>>;

  constructor(config: QueryConfig<T>) {
    this.query = gql`
      ${config.query}
    `;
    this.onFetchMore = config.onFetchMore;
    this.transformResult = config.transformResult;
    this.fetchMoreOptions = config.fetchMoreOptions;
  }
}
