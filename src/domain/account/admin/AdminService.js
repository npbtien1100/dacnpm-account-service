// Handle business
import autoBind from "auto-bind";

import createAdmin from "./AdminFactory";
import { hashPassword } from "../../../utils/Utility";
import BaseService from "../../../../base/BaseService";
import AdminRepository from "../../../infrastructure/account/admin/AdminRepository";
import HttpError from "../../../utils/HttpError";
import HttpResponse from "../../../utils/HttpResponse";

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
      return new HttpError({statusCode: 400, message: newAdmin.errMessage});
    }

    // Check Email Exist
    const checkEmailResult = await this.repository.findOneByEmail(data.email);

    if (!checkEmailResult.isSuccess) {
      return new HttpError({statusCode: 400, message: "Email has already registered"});
    }

    // HashPassword
    newAdmin.info.password = await hashPassword(newAdmin.info.password);

    // Create new admin
    const result = await this.repository.create(newAdmin.info);
    if (!result.isSuccess) {
      return new HttpError(result.message);
    }

    response.json = result;
    response.statusCode = 200;
    return new HttpResponse(result);
  }
}

export default new AdminService();
