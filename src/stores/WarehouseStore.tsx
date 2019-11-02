import { observable, action, flow } from 'mobx';
import { createContext } from 'react';

import { IWarehouse } from '../common/types';
import sampleData from '../common/sampleData';

interface IWarehouseStore {
    warehouses: IWarehouse[];
}

class WarehouseStore implements IWarehouseStore {
    @observable warehouses: IWarehouse[] = sampleData.warehouses;
}

const WarehouseStoreContext: React.Context<WarehouseStore> = createContext(new WarehouseStore());

export default WarehouseStoreContext;
