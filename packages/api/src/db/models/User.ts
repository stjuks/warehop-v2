import { Model, Table, Column, CreatedAt, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    googleId: string;

    @Column
    name: string;

    @Column
    regNr: string;

    @Column
    email: string;

    @Column
    phoneNr: string;

    @Column
    country: string;

    @Column
    county: string;

    @Column
    city: string;

    @Column
    street: string;

    @Column
    postalCode: string;
}
