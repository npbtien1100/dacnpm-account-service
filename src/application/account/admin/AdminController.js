import AdminService from "../../../domain/account/admin/AdminService.js";
import BaseController from "../../../../base/BaseController.js";
import autoBind from "auto-bind";
import { getPage } from "../../../../utils/Pagination.js";


// const adminService = new AdminService();

class AdminController extends BaseController {
  constructor() {
    super(AdminService);
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

  async getAll(req, res, next) {
    try {
      const reqpage = req.query.page;
      const page = getPage(reqpage);
      const limit = parseInt(process.env.PAGE_LIMIT);
      const result = await AdminService.getAll(page, limit);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const id = req.params.id;
      const result = await AdminService.getOne(id);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async createFromEmail(req, res, next) {
    try {
      const email = req.body.email;
      const result = await AdminService.createFromEmail(email);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AdminController();
