import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  AllowNull,
  Unique,
  BelongsToMany,
  DataType
} from 'sequelize-typescript';

import User from './User';
import Item from './Item';
import WarehouseItem from './WarehouseItem';

@Table
export default class Warehouse extends Model<Warehouse> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @PrimaryKey
  @Column
  userId: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.CITEXT)
  name: string;

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user: User;

  @BelongsToMany(() => Item, {
    through: () => WarehouseItem,
    foreignKey: 'warehouseId',
    onDelete: 'RESTRICT'
  })
  items: Item[];
}
