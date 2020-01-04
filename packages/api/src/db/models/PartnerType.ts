import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table
export default class PartnerType extends Model<PartnerType> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    slug: string;
}
