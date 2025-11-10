import {
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Unique,
  Model,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  freezeTableName: true,
  timestamps: true,
})
export class UserModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false })
  name: string;

  @Unique
  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;
}
