import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    email: { type: String, default: "", unique: true, required: true },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
    idCardNumber: { type: String, default: "" },
    taxCode: { type: String, default: "" },
    address: { type: String, default: "" },
    frontIdCardImage: { type: String, default: "" },
    backIdCardImage: { type: String, default: "" },
    portrait: { type: String, default: "" },
  },
  { timestamps: true }
);

const sellerModel = mongoose.model("Seller", sellerSchema);
export default sellerModel;

// class Seller extends Model {}

// Seller.init(
//   {
//     email: {
//       type: String,
//       default: "",
//       unique: true,
//     },
//     name: {
//       type: String,
//       default: "",
//     },
//     phone: {
//       type: String,
//       default: "",
//     },
//     password: {
//       type: String,
//       default: "",
//     },
//     idCardNumber: {
//       type: String,
//       default: "",
//     },
//     taxCode: {
//       type: String,
//       default: "",
//     },
//     address: {
//       type: String,
//       default: "",
//     },
//     frontIdCardImage: {
//       type: String,
//       default: "",
//     },
//     backIdCardImage: {
//       type: String,
//       default: "",
//     },
//     portrait: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     sequelize,
//     modelName: "Seller",
//     paranoid: true,
//   }
// );

// export default Seller;
