import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;
