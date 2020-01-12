import { observable, action, flow } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { ProductItem } from 'shared/types';

class ProductStore {
    @observable products: ProductItem[] = [];
}

export const ProductStoreContext: React.Context<ProductStore> = createContext(new ProductStore());
