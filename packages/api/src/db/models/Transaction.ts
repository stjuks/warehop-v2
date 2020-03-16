import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  DataType,
  Index
} from 'sequelize-typescript';

import TransactionType from './TransactionType';
import User from './User';
import Invoice from './Invoice';

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
  @Index
  @Column
  invoiceId: number;

  @AllowNull(false)
  @Index
  @Column
  type: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(12, 4))
  sum: object;

  @AllowNull(false)
  @Column
  date: Date;

  @Column
  description: string;

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user: User;

  @BelongsTo(() => Invoice, { foreignKey: 'invoiceId', onDelete: 'CASCADE' })
  invoice: Invoice;

  @BelongsTo(() => TransactionType, { foreignKey: 'type', onDelete: 'RESTRICT' })
  transactionType: TransactionType;
}
