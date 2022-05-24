import joi from "@hapi/joi";

class SellerValidation {
  static registerValidation(req, res, next) {
    const seller = {
      email: joi.string().max(255).email().required(),
      password: joi.string().min(6).max(255).required(),
      confirmPassword: joi.string().max(255).required(),
      fullName: joi.string().max(255).required(),
      phone: joi.number().min(9),
    };
    const result = joi.validate(req.body, seller);
    if (result.error) {
      return res.status(400).json({
        message: result.error.details[0].message,
      });
    }
    next();
  }
}

export default SellerValidation;
