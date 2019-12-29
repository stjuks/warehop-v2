import { Model, Table, Column, CreatedAt } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    
    @Column
    fullName?: string;

    @Column
    email!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

}