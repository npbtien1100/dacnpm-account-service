/* eslint-disable class-methods-use-this */
import autoBind from "auto-bind";
import AdminService from "../../../domain/account/admin/AdminService";
import BaseController from "../../../../base/BaseController";
import { getPage } from "../../../../utils/Pagination";

// const adminService = new AdminService();

class AdminController extends BaseController {
  constructor() {
    super(AdminService);
    autoBind(this);
  }

  async login(req, res) {
    try {
      const data = req.body;
      const result = await AdminService.loginAdmin(data);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    try {
      const data = req.body;
      const result = await AdminService.createAnAdmin(data);

      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req, res) {
    try {
      const reqpage = req.query.page;
      const page = getPage(reqpage);
      const limit = parseInt(process.env.PAGE_LIMIT, 10);
      const result = await AdminService.getAll(page, limit);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const result = await AdminService.getOne(id);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async createFromEmail(req, res) {
    try {
      const { email } = req.body;
      const result = await AdminService.createFromEmail(email);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AdminController();
