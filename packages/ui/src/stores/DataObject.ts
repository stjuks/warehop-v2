import { observable } from 'mobx';

interface PageInfo {
  hasNextPage: boolean;
  cursor?: string;
}

export default class AsyncDataArray<T> {
  @observable
  data: T[];

  @observable
  hasBeenLoaded: boolean = false;

  @observable
  isLoading: boolean = false;

  @observable
  isLoadingMore: boolean = false;

  @observable
  pageInfo: PageInfo = {
    hasNextPage: false,
    cursor: undefined
  };

  constructor(defaultValue: T[]) {
    this.data = defaultValue;
  }
}
