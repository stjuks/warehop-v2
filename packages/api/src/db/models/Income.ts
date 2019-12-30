import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    ForeignKey,
    BelongsTo,
    Sequelize,
    DataType,
    Unique
} from 'sequelize-typescript';

import User from './User';
import PartnerType from './PartnerType';

@Table
export default class Partner extends Model<Partner> {
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

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;

    @BelongsTo(() => PartnerType, { foreignKey: 'partnerTypeId', onDelete: 'RESTRICT' })
    partnerType: PartnerType;
}