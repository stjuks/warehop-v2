import { DocumentNode } from 'graphql';
import { gql, FetchMoreQueryOptions } from 'apollo-boost-upload';

interface QueryConfig {
  query: string;
  onFetchMore?: (prevResult, newResult) => any;
  transformResult?: (result) => any;
  fetchMoreOptions?: (data, variables: any) => Partial<FetchMoreQueryOptions<any, any>>;
}

export default class Query {
  query: DocumentNode;

  onFetchMore?: (prevResult, newResult) => void;

  transformResult?: (result: any) => any;

  fetchMoreOptions?: (data, variables: any) => Partial<FetchMoreQueryOptions<any, any>>;

  constructor(config: QueryConfig) {
    this.query = gql`
      ${config.query}
    `;
    this.onFetchMore = config.onFetchMore;
    this.transformResult = config.transformResult;
    this.fetchMoreOptions = config.fetchMoreOptions;
  }
}
