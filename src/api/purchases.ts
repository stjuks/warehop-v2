import { request } from './index';
import { SortDirection, Invoice } from '../common/types';
import sampleData from '../common/sampleData';

type PurchaseSortOption = 'invoiceNr' | 'partnerId' | 'purchaseDate' | 'dueDate' | 'sum';

const getPurchases = async (data: {
    limit: number;
    offset: number;
    sortBy?: PurchaseSortOption;
    sortDirection?: SortDirection;
    isPaid?: boolean;
}): Promise<Invoice[]> => {
    return await request.get({ url: '/purchases', data, mockData: sampleData.purchases });
};

export default {
    getPurchases
};
