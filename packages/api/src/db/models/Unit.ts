import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  DataType
} from 'sequelize-typescript';

import User from './User';

@Table({
  indexes: [
    {
      name: 'IDX_UQ_Units_userId_name',
      unique: true,
      fields: ['userId', 'name']
    },
    {
      name: 'IDX_UQ_Units_userId_abbreviation',
      unique: true,
      fields: ['userId', 'abbreviation']
    }
  ]
})
export default class Unit extends Model<Unit> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @PrimaryKey
  @Column
  userId: number;

  @AllowNull(false)
  @Column(DataType.CITEXT)
  name: string;

  @AllowNull(false)
  @Column(DataType.CITEXT)
  abbreviation: string;

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user: User;
}
