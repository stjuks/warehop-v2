import { IWarehouseProductQuantity } from './warehouses';
import { IUnit, IPartner } from './index';

export interface IProduct {
    id: number;
    name: string;
    purchasePrice: number;
    retailPrice: number;
    unit: IUnit;
    description: string;
}

export interface IWarehouseProduct extends IProduct {
    code: string;
    quantity: IWarehouseProductQuantity[];
    partner?: IPartner;
}

export interface IServiceProduct extends IProduct {
    quantity: number
}

export interface IProductDetailed extends IProduct {
    quantity: number;
    warehouses: IWarehouseProductQuantity[];
    partner: IPartner;
}
