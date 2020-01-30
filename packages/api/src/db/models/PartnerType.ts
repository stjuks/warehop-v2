import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript';

@Table
export default class PartnerType extends Model<PartnerType> {
    @PrimaryKey
    @Column
    id: string;
}
