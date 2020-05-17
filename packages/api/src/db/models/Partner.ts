import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  Unique,
  Index,
  DataType
} from 'sequelize-typescript';

import User from './User';
import PartnerType from './PartnerType';

@Table({
  indexes: [
    {
      name: 'IDX_UQ_Partners_userId_type_name',
      unique: true,
      fields: ['userId', 'type', 'name']
    }
  ]
})
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
  @Index
  @Column
  type: string;

  @AllowNull(false)
  @Column(DataType.CITEXT)
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
  county?: string;

  @Column
  address?: string;

  @Column
  postalCode?: string;

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user: User;

  @BelongsTo(() => PartnerType, { foreignKey: 'type', onDelete: 'RESTRICT' })
  partnerType: PartnerType;
}
