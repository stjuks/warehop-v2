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
    Unique
} from 'sequelize-typescript';

import User from './User';
import Partner from './Partner';
import Unit from './Unit';
import ItemType from './ItemType';
import Invoice from './Invoice';
import InvoiceItem from './InvoiceItem';
import Warehouse from './Warehouse';
import WarehouseItem from './WarehouseItem';

@Table
export default class Item extends Model<Item> {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id: number;

    @PrimaryKey
    @Column
    userId: number;

    @Column
    partnerId: number;

    @Column
    unitId: number;

    @AllowNull(false)
    @Column
    itemTypeId: number;

    @AllowNull(false)
    @Column
    name: string;

    @Column
    code: string;

    @Column(DataType.DECIMAL(12, 4))
    purchasePrice: object;

    @Column(DataType.DECIMAL(12, 4))
    retailPrice: object;

    @Column
    description: string;

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
    user: User;

    @BelongsTo(() => Partner, { foreignKey: 'partnerId', onDelete: 'RESTRICT' })
    partner: Partner;

    @BelongsTo(() => Unit, { foreignKey: 'unitId', onDelete: 'RESTRICT' })
    unit: Unit;

    @BelongsTo(() => ItemType, { foreignKey: 'itemTypeId', onDelete: 'RESTRICT' })
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
        onDelete: 'RESTRICT',
        as: 'warehouseQuantity'
    })
    warehouses: Warehouse[];
}
