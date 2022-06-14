import joi from "@hapi/joi";
import { makeCode } from "../../../utils/Utility";
import { Admin } from "./AdminDomainModel";

export const createAdmin = (data) => {
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
    error: false,
  };
  const validationResult = admin.validate(data);

  if (validationResult.error) {
    newAdmin.error = true;
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

export const createAdminsFromArray = (data) => {
  const emails = joi.array().required().items(joi.string().email());
  const validationResult = emails.validate(data);

  const admins = { info: [], errMessage: "" };

  if (validationResult.error) {
    console.log(validationResult.error.details[0].message);
    admins.errMessage = validationResult.error.details[0].message;
  } else {
    data.forEach((email) => {
      const password = makeCode(8);
      admins.info.push(new Admin(email, password));
    });
  }

  return admins;
};
