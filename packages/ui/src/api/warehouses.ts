import { request } from './index';
import { Warehouse } from 'shared/types';
import endpoints from 'shared/endpoints';

const getWarehouses = async (): Promise<Warehouse[]> => {
    return await request.get({ url: endpoints.warehouses });
};

const addWarehouse = async (data: Warehouse) => {
    return await request.post({ url: endpoints.warehouses, data });
};

const editWarehouse = async (data: Warehouse) => {
    return await request.put({ url: endpoints.warehouses, data });
};

export default {
    getWarehouses,
    addWarehouse,
    editWarehouse
};
