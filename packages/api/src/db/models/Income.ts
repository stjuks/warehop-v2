import { Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull, BelongsTo, Unique } from 'sequelize-typescript';

import User from './User';
import Partner from './Partner';

@Table
export default class Income extends Model<Income> {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id: number;

    @PrimaryKey
    @Column
    userId: number;

    @AllowNull(false)
    @Column
    partnerId: number;

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

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;

    @BelongsTo(() => Partner, { foreignKey: 'partnerId', onDelete: 'RESTRICT' })
    partner: Partner;
}
