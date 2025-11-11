import {
  AllowNull,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Unique,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/entity/user.model';

@Table({
  tableName: 'inventory_items',
  timestamps: true,
})
export class InventoryModel extends Model<InventoryModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Unique
  @Column({ allowNull: false })
  name: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID })
  @Column({ allowNull: false })
  user_id: string;

  @Column({ allowNull: false })
  category: string;

  @AllowNull
  @Column
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Default(0)
  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @BelongsTo(() => UserModel, { as: 'user', foreignKey: 'user_id' })
  user!: UserModel[];
}
