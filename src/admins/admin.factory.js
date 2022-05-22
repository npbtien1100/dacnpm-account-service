import joi from "@hapi/joi";

import { Admin } from "./admin.domainModel";

const createAdmin = (data) => {
  const admin = joi.object({
    phone: joi.optional(),
    address: joi.string().optional(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    fullName: joi.string().min(2).max(50).required(),
  });

  const newAdmin = {
    info: {},
    errMessage: '',
  };
  const validationResult = admin.validate(data);

  if (validationResult.error) {
    console.log(validationResult.error.details[0].message);
    newAdmin.errMessage = validationResult.error.details[0].message;
  } else {
    newAdmin.info = new Admin(data.email, data.password, data.fullName, data.phone, data.address);
  }

  return newAdmin;
}


// this object is for create an admin just form an email
const adminEmail = (data) => {
  // create a joi object with validate for email (require @ and .com)
  const admin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().optional(),
    fullName: joi.string().min(2).max(50).optional(),
    role: joi.string().optional().valid(['admin', 'user']),
  });

  const newAdmin = {
    info: {},
    errMessage: '',
  };
  const validationResult = admin.validate(data);

  if (validationResult.error) {
    console.log(validationResult.error.details[0].message);
    newAdmin.errMessage = validationResult.error.details[0].message;
  } else {
    newAdmin.info = new Admin(data.email);
  }

  return newAdmin;
}

export { createAdmin, adminEmail };