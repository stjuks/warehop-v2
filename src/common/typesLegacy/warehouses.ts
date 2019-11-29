export interface IWarehouse {
    id: number;
    name: string;
}

export interface IWarehouseProductQuantity extends IWarehouse {
    quantity: number;
}