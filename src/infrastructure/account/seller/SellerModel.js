import { Model } from "sequelize";
import sequelize from "../../../../config/MySQLConfig";

class Seller extends Model { }
Seller.init(
  {
    email: {
      type: String,
      default: "",
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    idCardNumber: {
      type: String,
      default: "",
    },
    taxCode: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    frontIdCardImage: {
      type: String,
      default: "",
    },
    backIdCardImage: {
      type: String,
      default: "",
    },
    portrait: {
      type: String,
      default: "",
    },
  },
  {
    sequelize,
    modelName: "seller",
    paranoid: true,
  }
);

export default Seller;
