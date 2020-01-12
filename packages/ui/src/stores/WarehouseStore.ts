import { observable, action, flow } from 'mobx';
import { createContext } from 'react';

import { Warehouse } from 'shared/types';

class WarehouseStore  {
    @observable warehouses: Warehouse[] = [];
}

const WarehouseStoreContext: React.Context<WarehouseStore> = createContext(new WarehouseStore());

export default WarehouseStoreContext;
