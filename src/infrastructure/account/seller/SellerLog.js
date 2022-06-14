// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/db.config");
// const { v4: uuidv4 } = require("uuid");
import { Model, DataTypes } from "sequelize";
import sequelize from "../../../../config/MySQLConfig";
import { v4 as uuidv4 } from "uuid";

class SellerLog extends Model {}

SellerLog.init(
  {
    stt: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idEvent: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.STRING,
    },
    timeStamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isRun: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "seller_log",
  }
);

export default SellerLog;
