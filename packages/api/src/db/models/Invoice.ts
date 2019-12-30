import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo, Sequelize, DataType } from 'sequelize-typescript';

import User from './User';
import Partner from './Partner';
import InvoiceType from './InvoiceType';

@Table
export default class Invoice extends Model<Invoice> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId: number;

    @AllowNull(false)
    @ForeignKey(() => Partner)
    @Column
    partnerId: number;

    @AllowNull(false)
    @ForeignKey(() => InvoiceType)
    @Column
    invoiceTypeId: number;
    
    @AllowNull(false)
    @Column
    number: string;

    @AllowNull(false)
    @Column
    dueDate: Date;

    @AllowNull(false)
    @Column
    issueDate: Date;

    @AllowNull(false)
    @Column
    isPaid: boolean;

    @AllowNull(false)
    @Column(DataType.DECIMAL(12, 4))
    sum: object;

    @Column
    description: string;

    @Column
    filePath: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Partner)
    partner: Partner;

    @BelongsTo(() => InvoiceType)
    invoiceType: InvoiceType;
    
}