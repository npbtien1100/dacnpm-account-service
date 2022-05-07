import joi from "@hapi/joi";
import { Admin } from "./AdminDomainModel";

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
    errMessage: "",
  };
  const validationResult = admin.validate(data);

  if (validationResult.error) {
    console.log(validationResult.error.details[0].message);
    newAdmin.errMessage = validationResult.error.details[0].message;
  } else {
    newAdmin.info = new Admin(
      data.email,
      data.password,
      data.fullName,
      data.phone,
      data.address
    );
  }

  return newAdmin;
};

export { createAdmin };
