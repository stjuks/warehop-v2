import { observable } from 'mobx';
import { createContext } from 'react';

import { Warehouse } from '@shared/types';
import { task } from 'mobx-task';
import api from '../api';

class WarehouseStore {
    @observable warehouses: Warehouse[] = [];

    @task
    fetchWarehouses = async () => {
        const warehouses = await api.fetchWarehouses();

        this.warehouses = warehouses;
    };
}

const WarehouseStoreContext: React.Context<WarehouseStore> = createContext(new WarehouseStore());

export default WarehouseStoreContext;
