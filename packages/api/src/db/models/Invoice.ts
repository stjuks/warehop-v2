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
    BelongsToMany,
    Default
} from 'sequelize-typescript';

import User from './User';
import Partner from './Partner';
import InvoiceType from './InvoiceType';
import Item from './Item';
import InvoiceItem from './InvoiceItem';

@Table
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
    @Column
    partnerId: number;

    @AllowNull(false)
    @Column
    invoiceTypeId: string;

    @AllowNull(false)
    @Column
    number: string;

    @AllowNull(false)
    @Column
    dueDate: Date;

    @AllowNull(false)
    @Column
    issueDate: Date;

    @AllowNull(false)
    @Default(false)
    @Column
    isPaid: boolean;

    @AllowNull(false)
    @Column(DataType.DECIMAL(12, 4))
    sum: object;

    @Column
    description: string;

    @Column
    filePath: string;

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;

    @BelongsTo(() => Partner, { foreignKey: 'partnerId', onDelete: 'RESTRICT' })
    partner: Partner;

    @BelongsTo(() => InvoiceType, { foreignKey: 'invoiceTypeId', onDelete: 'RESTRICT' })
    invoiceType: InvoiceType;

    @BelongsToMany(() => Item, { through: () => InvoiceItem, foreignKey: 'invoiceId', onDelete: 'CASCADE' })
    items: Item[];
}
