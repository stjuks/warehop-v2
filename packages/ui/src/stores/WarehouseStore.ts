import { observable } from 'mobx';
import { createContext } from 'react';

import { Warehouse, AddWarehouseInput } from '@shared/types';
import { task } from 'mobx-task';
import api from '../api';

class WarehouseStore {
  @observable warehouses: Warehouse[] = [];

  constructor() {
    this.fetchWarehouses();
  }

  @task
  fetchWarehouses = async () => {
    const warehouses = await api.fetchWarehouses();

    this.warehouses = warehouses;
  };

  @task
  addWarehouse = async (warehouse: AddWarehouseInput) => {
    const id = await api.addWarehouse(warehouse);
    const newWarehouse: Warehouse = {
      ...warehouse,
      id,
    };

    this.warehouses.push(newWarehouse);
  };
}

const WarehouseStoreContext: React.Context<WarehouseStore> = createContext(new WarehouseStore());

export default WarehouseStoreContext;
