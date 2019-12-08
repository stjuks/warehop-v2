interface Article {
    id: number;
    name: string;
    type: ArticleType;
    retailPrice?: number;
    purchasePrice?: number;
    description?: string;
}

export interface ProductQuantityByWarehouse extends Warehouse {
    quantity: number;
}

export type ArticleType = 'SERVICE' | 'PRODUCT';

export type InvoiceType = 'SALE' | 'PURCHASE';

export type PartnerType = 'VENDOR' | 'CLIENT';

export type SortDirection = 'asc' | 'desc';

export interface Service extends Article {
    unit?: Unit;
}

export interface Product extends Article {
    unit: Unit;
    code: string;
    quantity: number;
    vendor?: Partner;
    quantityByWarehouse?: ProductQuantityByWarehouse[];
}

export interface Invoice {
    id: number;
    type: InvoiceType;
    number: string;
    dueDate: Date;
    creationDate: Date;
    partner: Partner;
    sum: number;
    isPaid: boolean;
    description?: string;
    fileURI?: string;
    items?: (Product | Service)[];
}

export interface InvoiceItem {
    type: ArticleType;
    quantity: number;
    name: string;
    id?: number;
    code?: string;
    retailPrice?: number;
    purchasePrice?: number;
    unit?: Unit;
    warehouse?: Warehouse;
}

export interface Partner {
    id: number;
    name: string;
    type: PartnerType;
    regNr?: string;
    VATnr?: string;
    phoneNr?: string;
    email?: string;
    address?: string;
    postalCode?: string;
    county?: string;
    country?: string;
}

export interface Unit {
    id: number;
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
