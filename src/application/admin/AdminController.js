import AdminService from "../../domain/admin/AdminService.js";
import BaseController from "../../../base/BaseController.js";
import autoBind from "auto-bind";

import { validPassword, hashPassword, makeCode } from "../../../helper/Utility.js";
import jwt from "jsonwebtoken";
import HttpResponse from "../../../helper/HttpResponse";

const adminService = new AdminService();

class AdminController extends BaseController {
  constructor() {
    super(adminService);
    autoBind(this);
  }

  async login(req, res, next) {
    try {
      const data = req.body;
      const result = await AdminService.loginAdmin(data);
      
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res, next) {
    try {
        const data = req.body;
        const result = await AdminService.createAnAdmin(data);
      
        res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AdminController();