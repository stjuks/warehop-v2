import { request } from './index';
import { SortDirection, Product } from 'shared/types';
import sampleData from '../common/sampleData';
import endpoints from 'shared/endpoints';

export type ProductSortOption = 'code' | 'retailPrice' | 'quantity' | 'name';

const getProducts = async (data: {
    limit: number;
    offset: number;
    sortBy?: ProductSortOption;
    sortDirection?: SortDirection;
    warehouseId?: number;
}): Promise<Product[]> => {
    return await request.get({ url: endpoints.products, data, mockData: sampleData.products });
};

const searchProducts = async (data: { query: string }): Promise<Product[]> => {
    return await request.get({
        url: endpoints.productsSearch,
        data,
        mockData: sampleData.products.filter(p => {
            const { query } = data;
            return p.code.includes(query) || (p.description && p.description.includes(query)) || p.name.includes(query);
        })
    });
};

const addProduct = async (data: { product: Product }) => {
    return await request.post({ url: endpoints.products, data });
};

const deleteProduct = async (data: { productId: number }) => {
    return await request.delete({ url: endpoints.products, data });
};

const editProduct = async (data: Product) => {
    return await request.put({ url: endpoints.products, data });
};

export default {
    getProducts,
    searchProducts,
    addProduct,
    deleteProduct,
    editProduct
};
