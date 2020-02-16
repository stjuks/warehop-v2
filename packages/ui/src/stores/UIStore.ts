import React from 'react';
import { observable, action } from 'mobx';
import { createContext } from 'react';

class UIStore {
  @observable isHamburgerMenuOpen: boolean = false;
  @observable isLoading: boolean = false;
  @observable loadingMessage?: string = undefined;
  @observable modals: React.ReactElement[] = [];

  @action
  setLoading(value: boolean, message?: string) {
    this.isLoading = value;
    this.loadingMessage = message;
  }

  @action
  setHamburgerMenuOpen = (value: boolean) => {
    this.isHamburgerMenuOpen = value;
  };

  @action
  openModal = (modal: React.ReactElement) => {
    this.modals.push(modal);
  };

  @action
  closeModal = () => {
    this.modals.pop();
  };
}

export const uiStore = new UIStore();

const UIStoreContext: React.Context<UIStore> = createContext(uiStore);

export default UIStoreContext;
