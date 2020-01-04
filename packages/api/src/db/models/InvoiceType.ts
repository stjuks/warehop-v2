import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table
export default class InvoiceType extends Model<InvoiceType> {
    @PrimaryKey
    @Column
    id: string;
}
