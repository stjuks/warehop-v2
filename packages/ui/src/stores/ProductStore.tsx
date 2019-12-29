import { observable, action, flow } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';

import api from '../api';

import { ProductSortOption } from '../api/products';
import { SortDirection, Product } from '../common/types';

class ProductStore {
    @observable products: Product[] = [];

    @observable productsSearch: Product[] = [];

    @observable isLoadingProducts: boolean = false;

    @action addProduct = (product?: Product) => {};

    @action deleteProduct = (productId: number) => {
        this.products = this.products.filter(p => p.id !== productId);
    };

    @action editProduct = () => {};

    @task fetchProducts = async (args: {
        warehouseId: number;
        sortBy: ProductSortOption;
        sortDirection: SortDirection;
    }) => {
        const products: Product[] = await api.getProducts({
            limit: 10,
            offset: 10,
            ...args
        });

        if (products) this.products = products;
    };

    /* @action fetchProducts = flow(function*(
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
    }); */

    @action searchProducts = flow(function*(this: ProductStore, query: string) {
        try {
            if (query) {
                this.isLoadingProducts = true;

                const products = yield api.searchProducts({ query });

                if (products) this.productsSearch = products;

                this.isLoadingProducts = false;
            }
        } catch (err) {
            throw err;
        }
    });
}

export const ProductStoreContext: React.Context<ProductStore> = createContext(new ProductStore());
