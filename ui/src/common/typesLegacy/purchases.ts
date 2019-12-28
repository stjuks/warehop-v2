import { IPartner } from './index';

export interface IPurchase {
    partner: IPartner;
    invoiceNr: string;
    purchaseDate: Date;
    dueDate: Date;
    description?: string;
    file?: string;
}