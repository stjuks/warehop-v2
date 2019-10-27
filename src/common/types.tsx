export interface IProduct {
    id: number;
    name: string;
    purchasePrice: number;
    retailPrice: number,
    quantity: number;
    code: string;
    unit: IUnit;
    description: string;
}

export interface IUnit {
    id: number;
    abbr: string;
    name: string;
}

export interface IProductDetailed extends IProduct {
    warehouses: IWarehouseProduct[];
    partner: IPartner;
}

export interface IPartner {
    id: number;
    name: string;
}

export interface IWarehouse {
    id: number;
    name: string;
}

export interface IWarehouseProduct extends IWarehouse {
    quantity: number;
}
