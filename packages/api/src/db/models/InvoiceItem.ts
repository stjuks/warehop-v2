import {
  Model,
  Table,
  Column,
  PrimaryKey,
  BelongsTo,
  DataType,
  ForeignKey,
  AllowNull,
  Index
} from 'sequelize-typescript';

import Invoice from './Invoice';
import Warehouse from './Warehouse';
import Item from './Item';
import Unit from './Unit';
import User from './User';

@Table({
  indexes: [
    {
      name: 'IDX_UQ_InvoiceItems_userId_invoiceId_name',
      unique: true,
      fields: ['userId', 'invoiceId', 'name']
    }
  ]
})
export default class InvoiceItem extends Model<InvoiceItem> {
  @PrimaryKey
  @ForeignKey(() => Invoice)
  @Column
  invoiceId: number;

  @PrimaryKey
  @ForeignKey(() => Item)
  @Column
  itemId: number;

  @Index
  @Column
  warehouseId: number;

  @Index
  @Column
  unitId: number;

  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @Column(DataType.CITEXT)
  name: string;

  @AllowNull(false)
  @Column
  quantity: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(12, 4))
  price: object;

  @BelongsTo(() => Invoice, { foreignKey: 'invoiceId' })
  invoice: Invoice;

  @BelongsTo(() => Warehouse, { foreignKey: 'warehouseId' })
  warehouse: Warehouse;

  @BelongsTo(() => Unit, { foreignKey: 'unitId', onDelete: 'RESTRICT' })
  unit: Unit;

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
  user: User;

  @BelongsTo(() => Item, { foreignKey: 'itemId', onDelete: 'CASCADE' })
  item: Item;
}
