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
  DataType,
} from 'sequelize-typescript';

import User from './User';
import PartnerType from './PartnerType';
import Invoice from './Invoice';

@Table
export default class InvoicePartner extends Model<InvoicePartner> {
  @PrimaryKey
  @Column
  invoiceId: number;

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
  country?: string;

  @Column
  county?: string;

  @Column
  city?: string;

  @Column
  street?: string;

  @Column
  postalCode?: string;

  @BelongsTo(() => Invoice, { foreignKey: 'invoiceId', onDelete: 'CASCADE' })
  invoice: Invoice;

  @BelongsTo(() => User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  user: User;

  @BelongsTo(() => PartnerType, { foreignKey: 'type', onDelete: 'RESTRICT' })
  partnerType: PartnerType;
}
