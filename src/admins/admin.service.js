import autoBind from "auto-bind";
import BaseSevice from "../../base/BaseService";

import { createAdmin } from "./admin.factory";
import AdminSequelize from "./admin.sequelize";
import { hashPassword } from "../../helper/Utility";

const adminSequelize = new AdminSequelize();

class AdminService extends BaseSevice {
  constructor() {
    super(adminSequelize);
    autoBind(this);
  }

  async createAnAdmin(data) {
    const response = {
      json: null,
      statusCode: null,
    }

    // Validate data and create object
    const newAdmin = createAdmin(data);
    if (newAdmin.errMessage) {
      response.statusCode = 400;
      response.json = {
        message: newAdmin.errMessage      
      };
      return response;
    }

    //Check Email Exist
    const checkEmailResult = await this.sequelize.findOneByEmail(data.email);

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
    const result = await this.sequelize.create(newAdmin.info);
    if (!result.isSuccess) {speechSynthesis
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
