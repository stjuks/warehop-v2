import React from 'react';
import { observable, action } from 'mobx';
import { createContext } from 'react';
import history from '@ui/util/history';
import routes from '@ui/util/routes';
import { LocationDescriptorObject } from 'history';

interface HistoryOptions extends LocationDescriptorObject {
  replace?: boolean;
  isModal?: boolean;
}

class UIStore {
  @observable isHamburgerMenuOpen: boolean = false;
  @observable isLoading: boolean = false;
  @observable loadingMessage?: string = undefined;
  @observable modals: React.ReactElement[] = [];

  @observable routeHistory: string[] = [];

  constructor() {
    this.routeHistory.push(history.location.pathname);

    window.onpopstate = () => {
      this.closeModal();
    };
  }

  @action
  goTo = (route: string, historyOptions?: HistoryOptions) => {
    const replace = historyOptions?.replace;
    const isModal = historyOptions?.isModal;

    let historyFn = history.push;
    if (replace) historyFn = history.replace;

    if (!isModal) this.modals = [];

    historyFn({ ...historyOptions, pathname: route });

    if (replace) this.routeHistory.splice(this.routeHistory.length - 1, 1, route);
    else this.routeHistory.push(route);
  };

  @action
  goBack = (fallbackRoute?: typeof routes[keyof typeof routes]) => {
    console.log(this.routeHistory);
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
    this.goTo(history.location.pathname, { isModal: true });
  };

  @action
  closeModal = () => {
    this.modals.pop();
  };
}

export const uiStore = new UIStore();

const UIStoreContext: React.Context<UIStore> = createContext(uiStore);

export default UIStoreContext;
