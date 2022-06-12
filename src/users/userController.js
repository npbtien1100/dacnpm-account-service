import autoBind from "auto-bind";
import jwt from "jsonwebtoken";
import UserService from "./userService";
import BaseController from "../../base/BaseController";

import { registerValidate } from "./userValidate";

import { validPassword, hashPassword, makeCode } from "../../helper/Utility";
import HttpResponse from "../../helper/HttpResponse";

const userService = new UserService();

class UserController extends BaseController {
  constructor() {
    super(userService);
    autoBind(this);
  }

  async register(req, res, next) {
    try {
      // Validate Registers
      const data = req.body;
      const validated = registerValidate(data);
      if (validated.error != null) {
        return res.status(400).json({
          error: true,
          message: validated.error.details[0].message,
        });
      }

      // Check Confirm Password
      if (data.password != data.confirmPassword) {
        return res.status(400).json({
          error: true,
          message: "Confirm password is incorrect.",
        });
      }

      // Check Email Exist
      const checkEmailResult = await this.service.findOneByEmail(data.email);
      if (checkEmailResult != null) {
        return res.status(400).json({
          error: true,
          message: "Email has already registered",
        });
      }
      // HashPassword
      const { password } = data;
      data.password = await hashPassword(password);

      // Create key and Send Mail
      data.code = makeCode(26);
      //   data.link =
      //     process.env.URL_WEB +
      //     "/api/users/confirm-registration?code=" +
      //     data.code +
      //     "&email=" +
      //     data.email;
      //   MailServices.sendMailRegister(data);

      // Register new User
      const result = await this.service.registerUser(data);
      if (result.error) {
        res.status(500).send({
          message: result.error,
        });
        return;
      }

      return res.status(200).json({
        error: false,
        message: result,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const data = req.body;
      // console.log(req.body);
      // Find User In DB
      const user = await this.service.findOneByEmail(data.email);
      // console.log(user);
      if (!user) {
        return res.status(400).json({
          error: true,
          message: "The email you entered is not registered.",
        });
      }
      // Check Register type
      if (user.registerType == "socialLinked") {
        return res.status(400).json({
          error: true,
          message: "Please login with your social account.",
        });
      }
      // Check Password
      console.log(`Password ${user.password}`);
      const isValid = await validPassword(data.password, user.password);
      if (!isValid) {
        return res.status(400).json({
          error: true,
          message: "The password you entered is not correct",
        });
      }
      // Check is verified, is lock
      const isVerified = user.isVerify === true;
      if (!isVerified) {
        return res.status(400).json({
          error: true,
          message: "Your email isn't verified. Please confirm your email.",
        });
      }
      const isLocked = user.isLock === true;
      if (isLocked) {
        return res.status(400).json({
          error: true,
          message: "Your account is locked.",
        });
      }
      // JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 10000000,
      });
      // res.header("auth-token", token).send(token);

      // const tokenObject = Util.issueJWT(user);
      return res.status(200).json(
        new HttpResponse({
          id: user.id,
          token,
          expiresIn: 10000000,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
