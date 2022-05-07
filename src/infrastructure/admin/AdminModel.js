import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/MySQLConfig";

class Admin extends Model {}
Admin.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "admin",
  }
);

export default Admin;

// import mongoose from 'mongoose';

// const adminSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     address: { type: String },
//     phone: { type: String },
//   },
//   { timestamps: true }
// );

// const AdminModel = mongoose.model('Admin', adminSchema);
// export default AdminModel;
