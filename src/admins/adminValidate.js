import joi from "@hapi/joi";

export function validateCreateAdmin(data) {
  const Admin = joi.object({
    fullName: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.optional(),
    address: joi.string().optional(),
  });
  return Admin.validate(data);
}

export function validateUpdateAdmin(data) {
  const Admin = joi.object({
    fullName: joi.string().min(2).max(50).required(),
    phone: joi.optional(),
    address: joi.string().optional(),
  });
  return Admin.validate(data);
}

export function validateUpdateUser(data) {
  const User = joi.object({
    studentId: joi.optional(),
    isLock: joi.bool().optional(),
  });
  return User.validate(data);
}
