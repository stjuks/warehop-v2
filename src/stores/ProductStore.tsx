import { observable, action, flow } from 'mobx';
import { createContext } from 'react';

import { stall } from '../util/helpers';
import sampleData from '../common/sampleData';
import { CancellablePromise } from 'mobx/lib/api/flow';
import api from '../api';

import { ProductSortOption } from '../api/products';
import { SortDirection, Product } from '../common/types';

class ProductStore {
    @observable products: Product[] = [];

    @observable isLoadingProducts: boolean = false;

    @action addProduct = (product?: Product) => {};

    @action deleteProduct = () => {};

    @action editProduct = () => {};

    @action fetchProducts = flow(function*(
        this: ProductStore,
        args: { warehouseId: number; sortBy: ProductSortOption; sortDirection: SortDirection }
    ) {
        try {
            this.isLoadingProducts = true; 

            const products = yield api.getProducts({
                limit: 10,
                offset: 10,
                ...args
            });

            if (products) this.products = products;

            this.isLoadingProducts = false;
        } catch (err) {
            throw err;
        }
    });
}

export const ProductStoreContext: React.Context<ProductStore> = createContext(new ProductStore());
