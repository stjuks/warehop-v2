import {
    Model,
    Table,
    Column,
    PrimaryKey,
    BelongsTo,
    DataType,
    HasOne,
    ForeignKey,
    AllowNull
} from 'sequelize-typescript';
import Invoice from './Invoice';
import Warehouse from './Warehouse';
import Item from './Item';

@Table
export default class InvoiceItem extends Model<InvoiceItem> {
    @PrimaryKey
    @ForeignKey(() => Invoice)
    @Column
    invoiceId: number;

    @PrimaryKey
    @ForeignKey(() => Item)
    @Column
    itemId: number;

    @Column
    warehouseId: number;

    @Column(DataType.DECIMAL(12, 4))
    purchasePrice: object;

    @AllowNull(false)
    @Column
    quantity: number;

    @HasOne(() => Invoice, { foreignKey: 'id' })
    invoice: Invoice;

    @BelongsTo(() => Warehouse, { foreignKey: 'warehouseId' })
    warehouse: Warehouse;
}
