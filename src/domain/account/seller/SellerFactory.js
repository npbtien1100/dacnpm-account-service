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
      data.phone
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

  let result = {
    error: false,
    message: "",
  };

  if (validationResult.error) {
    result.message = validationResult.error.details[0].message;
    result.error = true;
  }
  return result;
};
