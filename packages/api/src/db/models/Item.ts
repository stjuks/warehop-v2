import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  DataType,
  BelongsToMany,
  Unique,
  Index
} from 'sequelize-typescript';

import User from './User';
import Partner from './Partner';
import Unit from './Unit';
import ItemType from './ItemType';
import Invoice from './Invoice';
import InvoiceItem from './InvoiceItem';
import Warehouse from './Warehouse';
import WarehouseItem from './WarehouseItem';

@Table({
  indexes: [
    {
      name: 'IDX_UQ_Items_userId_code',
      unique: true,
      fields: ['userId', 'code']
    },
    {
      name: 'IDX_UQ_Items_userId_name_type',
      unique: true,
      fields: ['userId', 'name', 'type']
    }
  ]
})
export default class Item extends Model<Item> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @PrimaryKey
  @Column
  userId: number;

  @Index
  @Column
  partnerId: number;

  @Index
  @Column
  unitId: number;

  @AllowNull(false)
  @Index
  @Column
  type: string;

  @AllowNull(false)
  @Column(DataType.CITEXT)
  name: string;

  @Column(DataType.CITEXT)
  code: string;

  @Column(DataType.DECIMAL(12, 4))
  purchasePrice: object;

  @Column(DataType.DECIMAL(12, 4))
  retailPrice: object;

  @Column(DataType.CITEXT)
  description: string;

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user: User;

  @BelongsTo(() => Partner, { foreignKey: 'partnerId', onDelete: 'RESTRICT' })
  partner: Partner;

  @BelongsTo(() => Unit, { foreignKey: 'unitId', onDelete: 'RESTRICT' })
  unit: Unit;

  @BelongsTo(() => ItemType, { foreignKey: 'type', onDelete: 'RESTRICT' })
  itemType: ItemType;

  @BelongsToMany(() => Invoice, {
    through: () => InvoiceItem,
    foreignKey: 'itemId',
    onDelete: 'RESTRICT',
    as: 'items'
  })
  invoices: Invoice[];

  @BelongsToMany(() => Warehouse, {
    through: () => WarehouseItem,
    foreignKey: 'itemId',
    onDelete: 'CASCADE',
    as: 'warehouseQuantity'
  })
  warehouses: Warehouse[];
}
