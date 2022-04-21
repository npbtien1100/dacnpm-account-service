import joi from "@hapi/joi";

const registerValidate = (data) => {
  const user = {
    email: joi.string().max(255).email().required(),
    password: joi.string().min(6).max(255).required(),
    confirmPassword: joi.string().max(255).required(),
    name: joi.string().max(255).required(),
    phone: joi.number().min(9),
  };
  return joi.validate(data, user);
};

const loginValidate = (data) => {
  const user = {
    email: joi.string().max(255).email().required(),
    password: joi.string().max(255).required(),
  };
  return joi.validate(data, user);
};

const updateUserValidate = (data) => {
  const user = {
    name: joi.string().max(255).required(),
    student_id: joi.number(),
    phone: joi.number(),
  };
  return joi.validate(data, user);
};

const _registerValidate = registerValidate;
export { _registerValidate as registerValidate };
const _loginValidate = loginValidate;
export { _loginValidate as loginValidate };
const _updateUserValidate = updateUserValidate;
export { _updateUserValidate as updateUserValidate };
