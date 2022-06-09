import joi from "@hapi/joi";
import { Admin } from "./AdminDomainModel";

export const createAdmin = async (data) => {
  const admin = joi.object({
    phone: joi.optional(),
    address: joi.string().optional(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    fullName: joi.string().min(2).max(50).required(),
  });

  const newAdmin = {
    info: {},
    Message: "",
    error: false
  };
  const validationResult = admin.validate(data);

  if (validationResult.error) {
    newAdmin.error = true
    newAdmin.Message = validationResult.error.details[0].message;
  } else {
    newAdmin.info = new Admin(
      data.email,
      data.password,
      data.fullName,
      data.phone,
      data.address,
    );
  }

  return newAdmin;
};

export const loginAdmin = async (data) => {
  const admin = joi.object({
    password: joi.string().required(),
    email: joi.string().email().required(),
  });

  const validationResult = admin.validate(data);

  let result = {
    error: false,
    message: ''
  }

  if(validationResult.error){
    result.message = validationResult.error.details[0].message
    result.error = true
  }
  return result;
};
