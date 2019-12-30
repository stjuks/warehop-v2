import {
    Model,
    Table,
    Column,
    CreatedAt,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    AllowNull,
    Unique,
    BelongsToMany
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
    @Column
    name: string;

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;

    @BelongsToMany(() => Item, { through: () => WarehouseItem, foreignKey: 'warehouseId', onDelete: 'RESTRICT' })
    items: Item[]
}
