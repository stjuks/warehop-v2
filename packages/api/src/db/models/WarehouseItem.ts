import { Model, Table, Column, BelongsTo, AllowNull, ForeignKey, DataType } from 'sequelize-typescript';

import Item from './Item';
import Warehouse from './Warehouse';
import User from './User';

@Table
export default class WarehouseItem extends Model<WarehouseItem> {
    @ForeignKey(() => Item)
    @Column
    itemId: number;

    @ForeignKey(() => Warehouse)
    @Column
    warehouseId: number;

    @AllowNull(false)
    @Column
    userId: number;

    @AllowNull(false)
    @Column(DataType.DOUBLE)
    quantity: object;

    @BelongsTo(() => Item, { foreignKey: 'itemId', onDelete: 'RESTRICT' })
    item: Item;

    @BelongsTo(() => Warehouse, { foreignKey: 'warehouseId', onDelete: 'RESTRICT' })
    warehouse: Warehouse;

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;
}
