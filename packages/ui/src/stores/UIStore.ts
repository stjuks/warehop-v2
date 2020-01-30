import { observable, action } from 'mobx';
import { createContext } from 'react';

class UIStore {
    @observable isHamburgerMenuOpen: boolean = false;

    @action setHamburgerMenuOpen = (value: boolean) => {
        this.isHamburgerMenuOpen = value;
    };
}

export const UIStoreContext: React.Context<UIStore> = createContext(new UIStore());
