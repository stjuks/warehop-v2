import { Model, Table, Column, CreatedAt, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';

import User from './User';

@Table
export default class Warehouse extends Model<Warehouse> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId: number;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsTo(() => User)
    user: User;

}