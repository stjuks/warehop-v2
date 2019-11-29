import { request } from './index';
import { SortDirection, Product } from '../common/types';
import sampleData from '../common/sampleData';

export type ProductSortOption = 'code' | 'retailPrice' | 'quantity' | 'name';

const getProducts = async (data: {
    limit: number;
    offset: number;
    sortBy?: ProductSortOption;
    sortDirection?: SortDirection;
    warehouseId?: number;
}): Promise<Product[]> => {
    return await request.get({ url: '/products', data, mockData: sampleData.products });
};

const searchProducts = async (data: { query: string }): Promise<Product[]> => {
    return await request.get({ url: '/products/search', data });
};

const addProduct = async (data: { product: Product }) => {
    return await request.post({ url: '/products', data });
};

const deleteProduct = async (data: { productId: number }) => {
    return await request.delete({ url: '/products', data });
};

const editProduct = async (data: Product) => {
    return await request.put({ url: '/products', data });
};

export default {
    getProducts,
    searchProducts,
    addProduct,
    deleteProduct,
    editProduct
};
