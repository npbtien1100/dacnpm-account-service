import BaseController from "../../base/BaseController";
import autoBind from "auto-bind";
import SellerService from "./sellerService";
import EmailHelper from "../../helper/email/EmailHelper";
import SaveHelper from "../../helper/file/FileSaveHelper";
import { validPassword, hashPassword } from "../../helper/Utility";
import { createJWT } from "../auth/auth.services";

const mailer = new EmailHelper();
const saver = new SaveHelper();

class SellerController extends BaseController {
  constructor() {
    super(new SellerService());
    autoBind(this);
  }
  async test(req, res, next) {
    try {
      const content = {
        link: "http://localhost:3000/seller/register",
      };
      const mailOptions = {
        from: req.body.from,
        to: req.body.to,
      };
      const result = await mailer.sendRegisterSeller(
        mailOptions.from,
        mailOptions.to,
        content
      );
      res.status(200).json({
        message: "Send mail success",
        result: result,
      });
    } catch (error) {
      console.log({ error });
      res.status(500).send(error);
    }
  }
  async upload(req, res, next) {
    try {
      console.log("file: " + req.file.path);
      const result = await saver.saveImage(req.file.path);
      res.status(200).json({
        message: "Upload success",
        result: result,
      });
    } catch (error) {
      console.log({ error });
      res.status(500).send(error);
    }
  }

  async uploadVideo(req, res, next) {
    try {
      console.log("file: " + req.file.path);
      const result = await saver.saveVideo(req.file.path);
      res.status(200).json({
        message: "Upload success",
        result: result,
      });
    } catch (error) {
      console.log({ error });
      res.status(500).send(error);
    }
  }
  async createASeller(req, res, next) {
    try {
      let data = req.body;
      //Check Email Exist
      const checkEmailResult = await this.service.findOneByEmail(data.email);
      if (checkEmailResult != null) {
        return res.status(400).json({
          success: false,
          message: "Email has already registered",
        });
      }
      //HashPassword
      const password = data.password;
      data.password = await hashPassword(password);

      //Create new admin
      const response = await this.service.insert(data);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
  async handleLogin(req, res, next) {
    try {
      const data = req.body;
      const user = await this.service.findOneByEmail(data.email);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "The email you entered is not registered.",
        });
      }
      //Check Password
      const isValid = await validPassword(data.password, user.password);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "The password you entered is not correct",
        });
      }
      //JWT
      const token = createJWT({ id: user.id });
      const returnObject = {
        success: true,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
        token: token,
        expiresIn: 10000000,
      };
      res.json(returnObject);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SellerController();
