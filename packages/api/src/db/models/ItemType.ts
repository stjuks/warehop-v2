import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table
export default class ItemType extends Model<ItemType> {
    @PrimaryKey
    @Column
    id: string;
}
