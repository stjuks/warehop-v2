import { observable, action, flow } from 'mobx';
import { createContext } from 'react';

import { Warehouse } from 'shared/types';
import sampleData from '../common/sampleData';

class WarehouseStore  {
    @observable warehouses: Warehouse[] = sampleData.warehouses;
}

const WarehouseStoreContext: React.Context<WarehouseStore> = createContext(new WarehouseStore());

export default WarehouseStoreContext;
