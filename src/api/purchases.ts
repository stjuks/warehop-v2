import { request } from './index';
import { SortDirection, Invoice } from '../common/types';

type PurchaseSortOption = 'invoiceNr' | 'partnerId' | 'purchaseDate' | 'dueDate' | 'sum';

const getPurchases = async (data: {
    limit: number;
    offset: number;
    sortBy?: PurchaseSortOption;
    sortDirection?: SortDirection;
    isPaid?: boolean;
}): Promise<Invoice[]> => {
    return await request.get({ url: '/purchases', data });
};