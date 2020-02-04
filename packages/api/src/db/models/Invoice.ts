import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    BelongsTo,
    DataType,
    Unique,
    Default,
    HasMany,
    Index
} from 'sequelize-typescript';

import User from './User';
import Partner from './Partner';
import InvoiceType from './InvoiceType';
import Item from './Item';
import InvoiceItem from './InvoiceItem';
import Transaction from './Transaction';

@Table({
    indexes: [
        {
            name: 'IDX_UQ_Invoices_userId_type_number',
            unique: true,
            fields: ['userId', 'type', 'number']
        }
    ]
})
export default class Invoice extends Model<Invoice> {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id: number;

    @PrimaryKey
    @Column
    userId: number;

    @AllowNull(false)
    @Index
    @Column
    partnerId: number;

    @AllowNull(false)
    @Index
    @Column
    type: string;

    @AllowNull(false)
    @Column(DataType.CITEXT)
    number: string;

    @AllowNull(false)
    @Column
    dueDate: Date;

    @AllowNull(false)
    @Column
    issueDate: Date;

    @AllowNull(false)
    @Column(DataType.DECIMAL(12, 4))
    sum: object;

    @Column(DataType.CITEXT)
    description: string;

    @Column
    filePath: string;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL(12, 4))
    paidSum: object;

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;

    @BelongsTo(() => Partner, { foreignKey: 'partnerId', onDelete: 'RESTRICT' })
    partner: Partner;

    @BelongsTo(() => InvoiceType, { foreignKey: 'type', onDelete: 'RESTRICT' })
    invoiceType: InvoiceType;

    @HasMany(() => InvoiceItem, { foreignKey: 'invoiceId', onDelete: 'RESTRICT', as: 'items' })
    items: Item[];

    @HasMany(() => Transaction, { foreignKey: 'invoiceId', onDelete: 'RESTRICT', as: 'transactions' })
    transactions: Transaction[];
}
