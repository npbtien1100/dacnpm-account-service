/* eslint-disable operator-linebreak */
import joi from "@hapi/joi";
import { Seller } from "./SellerDomainModel";

export const createSeller = async (data) => {
  const seller = joi.object({
    phone: joi.optional(),
    address: joi.string().optional(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    fullName: joi.string().min(2).max(50).required(),
  });

  const newSeller = {
    info: {},
    Message: "",
    error: false,
  };
  const validationResult = seller.validate(data);

  if (validationResult.error) {
    newSeller.error = true;
    newSeller.Message = validationResult.error.details[0].message;
  } else {
    newSeller.info = new Seller(
      data.email,
      data.password,
      data.fullName,
      data.phone || "",
      data.idCardNumber || "",
      data.taxCode || "",
      data.address || "",
      data.frontIdCardImage ||
        "https://res.cloudinary.com/dnvgrzylh/image/upload/v1652375647/frontCard_usvrlr.png",
      data.backIdCardImage ||
        "https://res.cloudinary.com/dnvgrzylh/image/upload/v1652375698/backCard_t9jrnl.jpg",
      data.portrait ||
        "https://res.cloudinary.com/dnvgrzylh/image/upload/v1652376072/portraitAvatar_cbzmc7.jpg",
      data.isVerified || 0,
    );
  }

  return newSeller;
};

export const loginSeller = async (data) => {
  const seller = joi.object({
    password: joi.string().required(),
    email: joi.string().email().required(),
  });

  const validationResult = seller.validate(data);

  const result = {
    error: false,
    message: "",
  };

  if (validationResult.error) {
    result.message = validationResult.error.details[0].message;
    result.error = true;
  }
  return result;
};
