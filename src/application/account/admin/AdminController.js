import AdminService from "../../../domain/account/admin/AdminService.js";
import BaseController from "../../../../base/BaseController.js";
import autoBind from "auto-bind";

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
}

export default new AdminController();