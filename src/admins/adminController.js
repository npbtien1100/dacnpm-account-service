import AdminService from "./adminService";
import BaseController from "../../base/BaseController";
import autoBind from "auto-bind";

import * as adminValidator from "./adminValidate";

import { validPassword, hashPassword } from "../../helper/Utility";
import { createJWT } from "../auth/auth.services";

const adminService = new AdminService();

class AdminController extends BaseController {
  constructor() {
    super(adminService);
    autoBind(this);
  }
  async handleLogin(req, res) {
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
  async getAllAdmins(req, res) {
    try {
      const result = await this.service.getAllAdmins();
      if (result.error) {
        res.status(500).send({
          message: result.error,
        });
        return;
      }
      res.send(result);
    } catch (error) {
      res.status(error.status || 501).json({ message: error.message });
    }
  }
  async createAnAdmin(req, res) {
    let data = req.body;
    const validated = adminValidator.validateCreateAdmin(data);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);

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
    const result = await this.service.createAnAdmin(data);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    return res.status(200).json(result);
  }
  async getAnAdmin(req, res) {
    try {
      const result = await this.service.getAnAdmin(req.params.adminId);
      if (result.error) {
        res.status(500).send({
          message: result.error,
        });
        return;
      }
      res.send(result);
    } catch (error) {
      res.status(error.status || 501).json({ message: error.message });
    }
  }
  async updateAnAdmin(req, res) {
    try {
      //Validate admin
      const validated = adminValidator.validateUpdateAdmin(req.body);
      if (validated.error != null)
        return res.status(400).send(validated.error.details[0].message);
      // update admin
      const result = await this.service.updateAnAdmin(
        req.params.adminId,
        req.body
      );
      if (result.error) {
        res.status(500).send({
          message: result.error,
        });
        return;
      }
      res.json(result);
    } catch (error) {
      res.status(error.status || 501).json({ message: error.message });
    }
  }
}

export default new AdminController();
