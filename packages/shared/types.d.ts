interface Item {
    id?: number;
    type: ItemType;
    name: string;
    purchasePrice: string;
    retailPrice: string;
    description: string;
    unit?: Unit;
}

export interface WarehouseQuantity extends Warehouse {
    quantity: number;
}

export type ItemType = 'PRODUCT' | 'SERVICE' | 'EXPENSE';
export type InvoiceType = 'SALE' | 'PURCHASE';
export type PartnerType = 'VENDOR' | 'CLIENT';
export type TransactionType = 'INCOME' | 'EXPENSE';

export type SortDirection = 'asc' | 'desc';

export interface ExpenseItem extends Item {
    type: 'SERVICE' | 'EXPENSE';
}

export interface ProductItem extends Item {
    type: 'PRODUCT';
    unit: Unit;
    code: string;
    warehouseQuantity: WarehouseQuantity[];
    partner?: Partner;
}

export interface Invoice {
    id: number;
    partner: Partner;
    type: InvoiceType;
    number: string;
    dueDate: Date;
    issueDate: Date;
    items: InvoiceItem[];
    isPaid: boolean;
    sum: string;
    description?: string;
    filePath?: string;
}

export interface Transaction {
    id: number;
    invoice: Invoice;
    sum: string;
    date: Date;
    description?: string;
}

export interface InvoiceItem {
    id: number;
    type: ItemType;
    name: string;
    quantity: number;
    price: string;
    code?: string;
    warehouse?: Warehouse;
    unit?: Unit;
}

export interface Partner {
    id: number;
    name: string;
    type: PartnerType;
    regNr?: string;
    VATnr?: string;
    phoneNr?: string;
    email?: string;
    street?: string;
    postalCode?: string;
    county?: string;
    country?: string;
}

export interface Unit {
    id?: number;
    name: string;
    abbreviation: string;
}

export interface User {
    id: number;
    name: string;
    regNr?: string;
    email?: string;
    phoneNr?: string;
    country?: string;
    county?: string;
    postalCode?: string;
    address?: string;
    city?: string;
    token?: string;
}

export interface Settings {
    id: number;
}

export interface Warehouse {
    id: number;
    name: string;
}

export interface BankAccount {
    id: number;
    bankName: string;
    accountNr: string;
}

export interface PaginatedData<T> {
    pageInfo: {
        hasNextPage: boolean;
        cursor?: string;
    };
    data: T[];
}

export interface ItemInput {
    type: ItemType;
    name: string;
    partnerId?: number;
    unitId?: number;
    code?: string;
    purchasePrice?: string;
    retailPrice?: string;
    description?: string;
    warehouseQuantity: WarehouseQuantity[];
}
