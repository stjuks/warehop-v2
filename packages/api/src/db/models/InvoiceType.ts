import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript';

@Table
export default class InvoiceType extends Model<InvoiceType> {
    @PrimaryKey
    @Column
    id: string;
}
