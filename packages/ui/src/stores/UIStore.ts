import { observable, action } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';

class UIStore {
  @observable isHamburgerMenuOpen: boolean = false;
  @observable isLoading: boolean = false;
  @observable loadingMessage?: string = undefined;

  @task
  setLoading(value: boolean, message?: string) {
    this.isLoading = value;
    this.loadingMessage = message;
  }

  @action setHamburgerMenuOpen = (value: boolean) => {
    this.isHamburgerMenuOpen = value;
  };
}

export const uiStore = new UIStore();

const UIStoreContext: React.Context<UIStore> = createContext(uiStore);

export default UIStoreContext;
