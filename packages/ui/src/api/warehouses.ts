import { request } from './index';
import { Warehouse } from '../common/types';

const getWarehouses = async (): Promise<Warehouse[]> => {
    return await request.get({ url: '/warehouses' });
};

const addWarehouse = async (data: Warehouse) => {
    return await request.post({ url: '/warehouses', data });
};

const editWarehouse = async (data: Warehouse) => {
    return await request.put({ url: '/warehouses', data });
};

export default {
    getWarehouses,
    addWarehouse,
    editWarehouse
};
