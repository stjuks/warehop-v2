import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    BelongsTo,
    DataType
} from 'sequelize-typescript';

import User from './User';
import Invoice from './Invoice';
import TransactionType from './TransactionType';

@Table
export default class Transaction extends Model<Transaction> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @PrimaryKey
    @Column
    userId: number;

    @AllowNull(false)
    @Column
    invoiceId: number;

    @AllowNull(false)
    @Column
    transactionTypeId: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL(12, 4))
    sum: object;

    @AllowNull(false)
    @Column
    date: Date;

    @Column
    description: string;

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;

    @BelongsTo(() => Invoice, { foreignKey: 'invoiceId', onDelete: 'CASCADE' })
    invoice: Invoice;

    @BelongsTo(() => TransactionType, { foreignKey: 'transactionTypeId', onDelete: 'RESTRICT' })
    transactionType: TransactionType;
}
