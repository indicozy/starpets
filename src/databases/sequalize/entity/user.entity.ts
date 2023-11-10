import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from "sequelize";
import { IUser, UserAttributes } from "../model/user.model";
import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements IUser
{
  public id!: string;
  public balance!: number;
}

User.init(
  {
    id: {
      // @ts-ignore TODO:
      type: Sequelize.UUID,
      // @ts-ignore TODO:
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    balance: DataTypes.DECIMAL(11, 3), // десятичные с тремя нулями
  },
  {
    sequelize: sequelize,
    tableName: "users",
  }
);

(async () => {
  await sequelize.sync(); // TODO: Не для прода, задача
})();
