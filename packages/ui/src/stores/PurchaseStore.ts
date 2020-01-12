import { observable, action, flow } from 'mobx';
import { createContext } from 'react';
import { Invoice } from 'shared/types';

class PurchaseStore {
    @observable purchases: Invoice[] = [];
}

export const PurchaseStoreContext: React.Context<PurchaseStore> = createContext(new PurchaseStore());
