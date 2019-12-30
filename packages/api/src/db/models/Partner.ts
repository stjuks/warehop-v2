import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo, Sequelize, DataType } from 'sequelize-typescript';

import User from './User';
import PartnerType from './PartnerType';

@Table
export default class Partner extends Model<Partner> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId: number;

    @AllowNull(false)
    @ForeignKey(() => PartnerType)
    @Column
    partnerTypeId: number;

    @AllowNull(false)
    @Column
    name: string;

    @Column
    regNr: string;

    @Column
    VATnr: string;

    @Column
    email?: string;

    @Column
    phoneNr?: string;

    @Column
    country?: string;

    @Column
    county?: string;

    @Column
    city?: string;

    @Column
    street?: string;

    @Column
    postalCode?: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => PartnerType)
    partnerType: PartnerType;
    
}