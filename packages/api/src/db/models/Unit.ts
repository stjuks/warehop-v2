import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    ForeignKey,
    BelongsTo,
    Unique
} from 'sequelize-typescript';
import User from './User';

@Table
export default class Unit extends Model<Unit> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @PrimaryKey
    @Column
    userId: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    abbreviation: string;

    @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
    user: User;
}
