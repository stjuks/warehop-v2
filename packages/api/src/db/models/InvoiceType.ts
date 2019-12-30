import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table
export default class InvoiceType extends Model<InvoiceType> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    slug: string;

    @AllowNull(false)
    @Column
    name: string;
}
