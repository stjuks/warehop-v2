import { ItemType, InvoiceType, WarehouseQuantity, PartnerType } from './types';

export interface InvoiceItemInput {
    type: ItemType;
    quantity: number;
    price: string;
    name: string;
    id?: number;
    warehouseId?: number;
    unitId?: number;
    code?: string;
}

export interface AddInvoiceInput {
    partnerId: number;
    type: InvoiceType;
    number: string;
    sum: string;
    items: InvoiceItemInput[];
    dueDate: Date;
    issueDate: Date;
    description?: string;
}

export interface InvoiceSearchInput {
    type: InvoiceType;
    number?: string;
    isPaid?: boolean;
    description?: string;
    partnerName?: string;
    generalQuery?: string;
}

export interface PaginatedQueryInput {
    cursor?: string;
    limit: number;
}

export interface WarehouseQuantityInput {
    id: number;
    name: string;
    quantity: number;
}

export interface AddItemInput {
    type: ItemType;
    name: string;
    partnerId?: number;
    unitId?: number;
    code?: string;
    purchasePrice?: string;
    retailPrice?: string;
    description?: string;
    warehouseQuantity: WarehouseQuantityInput[];
}

export interface ItemSearchInput {
    type: ItemType;
    name?: string;
    code?: string;
    description?: string;
    generalQuery?: string;
}

export interface AddPartnerInput {
    name: string;
    type: PartnerType;
    regNr?: string;
    VATnr?: string;
    email?: string;
    phoneNr?: string;
    country?: string;
    county?: string;
    city?: string;
    street?: string;
    postalCode?: string;
}

export interface AddTransactionInput {
    invoiceId: number;
    sum: string;
    date: Date;
    description?: string;
}
