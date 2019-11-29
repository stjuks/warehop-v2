import { observable, action, flow } from 'mobx';
import { createContext } from 'react';

class PurchaseStore {}

export const PurchaseStoreContext: React.Context<PurchaseStore> = createContext(new PurchaseStore());
