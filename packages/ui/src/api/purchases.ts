import { request } from './index';
import { SortDirection, Invoice } from 'shared/types';
import endpoints from 'shared/endpoints';
import sampleData from '../common/sampleData';

type PurchaseSortOption = 'invoiceNr' | 'partnerId' | 'purchaseDate' | 'dueDate' | 'sum';

const getPurchases = async (data: {
    limit: number;
    offset: number;
    sortBy?: PurchaseSortOption;
    sortDirection?: SortDirection;
    isPaid?: boolean;
}): Promise<Invoice[]> => {
    return await request.get({ url: endpoints.purchases, data, mockData: sampleData.purchases });
};

const addPurchase = async (data: Invoice) => {
    return await request.post({ url: endpoints.purchases, data });
};

export default {
    getPurchases,
    addPurchase
};
