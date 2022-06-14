import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    password: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    phone: { type: String, default: "" },
    isLock: { type: DataTypes.BOOLEAN, default: false },
    isVerify: { type: DataTypes.BOOLEAN, default: true },
    mailSecretCode: { type: String },
    registerType: { type: String },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
export default userModel;

// class User extends Model {}
// User.init(
//   {
//     name: {
//       type: String,
//       default: "",
//     },
//     image: {
//       type: String(300),
//       default: "",
//     },
//     password: {
//       type: String,
//       default: "",
//     },
//     email: {
//       type: String,
//       default: "",
//     },
//     phone: {
//       type: String,
//       default: "",
//     },
//     isLock: {
//       type: DataTypes.BOOLEAN,
//       default: false,
//     },
//     isVerify: {
//       type: DataTypes.BOOLEAN,
//       default: true,
//     },
//     mailSecretCode: {
//       type: String,
//     },
//     registerType: {
//       type: String,
//     },
//   },
//   {
//     sequelize,
//     modelName: "user",
//     paranoid: true,
//   }
// );

// export default User;
