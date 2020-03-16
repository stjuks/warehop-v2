import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript';

@Table
export default class TransactionType extends Model<TransactionType> {
  @PrimaryKey
  @Column
  id: string;
}
