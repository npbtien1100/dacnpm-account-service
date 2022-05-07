// Handle business
import autoBind from "auto-bind";

import { createAdmin } from "./AdminFactory";
import { hashPassword } from "../../utils/Utility";
import BaseService from "../../../base/BaseService";
import AdminRepository from "../../infrastructure/admin/AdminRepository";

const adminRepository = new AdminRepository();

class AdminService extends BaseService {
  constructor() {
    super(adminRepository);
    autoBind(this);
  }

  async createAnAdmin(data) {
    const response = {
      json: null,
      statusCode: null,
    };

    // Validate data and create object
    const newAdmin = createAdmin(data);
    if (newAdmin.errMessage) {
      response.statusCode = 400;
      response.json = {
        message: newAdmin.errMessage,
      };
      return response;
    }

    //Check Email Exist
    const checkEmailResult = await this.repository.findOneByEmail(data.email);

    if (checkEmailResult.isSuccess) {
      response.statusCode = 400;
      response.json = {
        success: false,
        message: "Email has already registered",
      };
      return response;
    }

    //HashPassword
    newAdmin.info.password = await hashPassword(newAdmin.info.password);

    //Create new admin
    const result = await this.repository.create(newAdmin.info);
    if (!result.isSuccess) {
      speechSynthesis;
      response.statusCode = 500;
      response.json = {
        message: result.message,
      };
      return response;
    }

    response.json = result;
    response.statusCode = 200;
    return response;
  }
}

export default new AdminService();
