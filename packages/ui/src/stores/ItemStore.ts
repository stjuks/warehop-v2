import { observable, action, flow, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { ProductItem, ExpenseItem, PaginatedData } from 'shared/types';
import api from '../api';

class ItemStore {
    @observable paginatedProducts: PaginatedData<ProductItem> = {
        pageInfo: {
            hasNextPage: false,
            cursor: undefined
        },
        data: []
    };

    @task
    fetchProducts = async (opts: { loadMore?: boolean } = {}) => {
        const { loadMore } = opts;
        const { data, pageInfo } = this.paginatedProducts;

        const products = await api.fetchProducts({
            limit: 1,
            cursor: loadMore ? this.paginatedProducts.pageInfo.cursor : undefined
        });

        if (!loadMore) this.paginatedProducts = products;
        else this.paginatedProducts = { ...products, data: [...data, ...products.data] };
    };

    @computed
    get products() {
        return this.paginatedProducts.data;
    }
}

export const ItemStoreContext: React.Context<ItemStore> = createContext(new ItemStore());
