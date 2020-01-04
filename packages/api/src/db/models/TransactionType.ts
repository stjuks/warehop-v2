import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table
export default class TransactionType extends Model<TransactionType> {
    @PrimaryKey
    @Column
    id: string;
}
