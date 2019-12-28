import { observable, action, flow } from 'mobx';
import { createContext } from 'react';
import { Invoice } from '../common/types';
import api from '../api';

class PurchaseStore {
    @observable purchases: Invoice[] = [];

    @observable isLoadingPurchases: boolean = false;

    @action fetchPurchases = flow(function*(this: PurchaseStore) {
        try {
            this.isLoadingPurchases = true;

            const purchases: any = yield api.getPurchases({
                limit: 10,
                offset: this.purchases.length
            });

            if (purchases) this.purchases = purchases;

            this.isLoadingPurchases = false;
        } catch (err) {
            throw err;
        }
    });

    @action addPurchase = flow(function*(this: PurchaseStore, purchase: Invoice) {
        try {
            const addedPurchase: any = yield api.addPurchase(purchase);

            this.purchases.push({
                ...purchase,
                ...addedPurchase
            });
        } catch (err) {
            throw err;
        }
    });
}

export const PurchaseStoreContext: React.Context<PurchaseStore> = createContext(new PurchaseStore());
