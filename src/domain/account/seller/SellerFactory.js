import joi from "@hapi/joi";
import { Seller } from "./SellerDomainModel";
import { UPDATE_SELLER, CREATE_SELLER, DELETE_SELLER } from "./event.const";

export const createSeller = async (data) => {
  const seller = joi.object({
    phone: joi.optional(),
    address: joi.string().optional(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    fullName: joi.string().min(2).max(50).required(),
    confirmPassword: joi.string().required(),
  });

  const newSeller = {
    info: {},
    Message: "",
    error: false,
  };
  const validationResult = seller.validate(data);

  //validate confirm password
  if (data.password !== data.confirmPassword) {
    newSeller.error = true;
    newSeller.Message = "Confirm password is not match";
    return newSeller;
  }

  if (validationResult.error) {
    newSeller.error = true;
    newSeller.Message = validationResult.error.details[0].message;
  } else {
    newSeller.info = {
      name: CREATE_SELLER,
      data: new Seller(data.email, data.password, data.fullName, data.phone),
    };
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

export const updateSeller = async (id, data) => {
  const seller = joi.object({
    phone: joi.optional(),
    address: joi.string().optional(),
    // password: joi.string().optional(),
    email: joi.string().email().optional(),
    fullName: joi.string().min(2).max(50).optional(),
  });

  const validationResult = seller.validate(data);

  if (validationResult.error) {
    return {
      isSuccess: false,
      message: validationResult.error.details[0].message,
    };
  }

  return {
    idEvent: id,
    name: UPDATE_SELLER,
    data: JSON.stringify({
      ...data,
    }),
  };
};
