// input types
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
  file?: File;
}

export interface AddWarehouseInput {
  name: string;
}

export interface InvoiceSearchInput {
  type?: InvoiceType;
  pagination?: PaginatedQueryInput;
  number?: string;
  isPaid?: boolean;
  description?: string;
  partnerName?: string;
  generalQuery?: string;
  isLocked?: boolean;
}

export interface PaginatedQueryInput {
  cursor?: string;
  limit: number;
}

export interface WarehouseQuantityInput {
  id?: number;
  name: string;
  quantity: number;
}

export interface TransactionQueryInput {
  pagination?: PaginatedQueryInput;
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  generalQuery?: string;
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

export interface ItemQueryInput {
  type?: ItemType;
  name?: string;
  code?: string;
  description?: string;
  generalQuery?: string;
  warehouseId?: number;
  pagination?: PaginatedQueryInput;
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

export interface SearchPartnerInput {
  type?: PartnerType;
  pagination?: PaginatedQueryInput;
  name?: string;
  phoneNr?: string;
  email?: string;
  generalQuery?: string;
}

// common types
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
  transactions: Transaction[];
  isPaid: boolean;
  isLocked: boolean;
  sum: string;
  paidSum: string;
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
  id?: number;
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
  id?: number;
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
  isLoaded?: boolean;
  isLoading?: boolean;
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

// errors
export type ErrorCode =
  | 'EntityAlreadyExistsError'
  | 'AuthenticationError'
  | 'GeneralError'
  | 'DeletionRestrictedError'
  | 'TriggerExceptionError';
