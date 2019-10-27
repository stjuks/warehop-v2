import { observable, action, flow } from 'mobx';
import { createContext } from 'react';

import { stall } from '../util/helpers';
import { IProduct } from '../common/types';
import sampleData from '../common/sampleData';
import { CancellablePromise } from 'mobx/lib/api/flow';

interface IProductStore {
    products: IProduct[];
    isLoadingProducts: boolean;
    deleteProduct(): void;
    addProduct(product: IProduct): void;
    editProduct(): void;
    fetchProducts(warehouseId, sortBy, sortDirection): CancellablePromise<void>;
}

class ProductStore implements IProductStore {
    @observable products: IProduct[] = [];

    @observable isLoadingProducts: boolean = false;

    @action addProduct = (product?: IProduct) => {};

    @action deleteProduct = () => {};

    @action editProduct = () => {};

    @action fetchProducts = flow(function*(
        this: ProductStore,
        warehouseId: number,
        sortBy: string,
        sortDirection: 1 | -1
    ) {
        try {
            this.isLoadingProducts = true;
            yield stall(500);
            this.isLoadingProducts = false;
            this.products = sampleData.products;
        } catch (err) {
            throw err;
        }
    });
}

export const ProductStoreContext: React.Context<ProductStore> = createContext(
    new ProductStore()
);
