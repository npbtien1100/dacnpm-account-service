// import mongoose from "mongoose";
import autoBind from "auto-bind";
import BaseSequelize from "../../base/BaseSequelize";
import adminModel from "./adminModel";

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

// const adminModel = mongoose.model("Admin", adminSchema);

class AdminSequelize extends BaseSequelize {
  constructor() {
    super(adminModel);
    autoBind(this);
  }
}

export default AdminSequelize;
