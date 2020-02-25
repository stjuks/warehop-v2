import React from 'react';
import { observable, action } from 'mobx';
import { createContext } from 'react';
import history from '@ui/util/history';
import routes from '@ui/util/routes';

class UIStore {
  @observable isHamburgerMenuOpen: boolean = false;
  @observable isLoading: boolean = false;
  @observable loadingMessage?: string = undefined;
  @observable modals: React.ReactElement[] = [];

  @observable routeHistory: string[] = [];

  constructor() {
    this.routeHistory.push(history.location.pathname);

    window.onpopstate = event => {
      this.closeModal();
    };
  }

  @action
  setRoute = (route: string, historyOptions?: object) => {
    history.push({ ...historyOptions, pathname: route });
    this.routeHistory.push(route);
  };

  @action
  goBack = (fallbackRoute?: typeof routes[keyof typeof routes]) => {
    if (this.routeHistory.length > 1) {
      this.routeHistory.pop();
      history.goBack();
      return;
    }

    if (fallbackRoute) history.push(fallbackRoute);
  };

  @action
  setLoading = (value: boolean, message?: string) => {
    this.isLoading = value;
    this.loadingMessage = message;
  };

  @action
  setHamburgerMenuOpen = (value: boolean) => {
    this.isHamburgerMenuOpen = value;
  };

  @action
  openModal = (modal: React.ReactElement) => {
    this.modals.push(modal);
    this.setRoute(history.location.pathname);
  };

  @action
  closeModal = () => {
    this.modals.pop();
  };
}

export const uiStore = new UIStore();

const UIStoreContext: React.Context<UIStore> = createContext(uiStore);

export default UIStoreContext;
