import autoBind from "auto-bind";
import BaseSevice from "../../base/BaseService";
import generator from "generate-password";
import { createAdmin, adminEmail } from "./admin.factory";
import AdminSequelize from "./admin.sequelize";
import { hashPassword, generateToken } from "../../helper/Utility";

const adminSequelize = new AdminSequelize();

class AdminService extends BaseSevice {
  constructor() {
    super(adminSequelize);
    autoBind(this);
  }

  // service for create admin document in db with all data in form
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
    if (!result.isSuccess) {
      speechSynthesis
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

  // service for search for an admin document in db with a unique email
  async findOneByEmail(email) {
    const response = {
      json: null,
      statusCode: null,
    }

    // call repository  to find a admin document by email 
    const result = await this.sequelize.findOneByEmail(email);
    // if fail return error
    if (!result.isSuccess) {
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

  //------------------------------------------------------------------------------------------------------------------------------------------

  // service for create admin document in db with email , password will be auto generate and send to email
  async createAdminByEmail(email) {
    const response = {
      statusCode: null,
      json: null,
    }

    // validate and create a object with factory
    const newAdmin = adminEmail(email);
    if (newAdmin.errMessage) {
      response.statusCode = 400;
      response.json = {
        message: newAdmin.errMessage
      };
      return response;
    }

    // check email exist
    const checkEmailResult = await this.sequelize.findOneByEmailAdmin(newAdmin.info.email);
    if (checkEmailResult.isSuccess) {
      response.statusCode = 400;
      response.json = {
        success: false,
        message: "Email has already registered",
      };
      return response;
    };

    // generate password for client
    const password = generator.generate({
      length: 8,
      numbers: true,
    })

    // hash the password
    newAdmin.info.password = await hashPassword(password);

    // add a dump admin name
    newAdmin.info.fullName = "Admin";

    // add admin role
    newAdmin.info.role = "admin";

    // create new admin
    const result = await this.sequelize.create(newAdmin.info);

    // if fail: return error
    if (!result.isSuccess) {
      response.statusCode = 500;
      response.json = {
        message: result.message,
      };
      return response;
    }

    // send new password to client
    response.json = {
      success: true,
      password: password,
      result: result,
    }
    response.statusCode = 200;
    return response;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------
  async login(data) {
    // deserialize data
    const { email, password } = data;

    const response = {
      json: null,
      statusCode: null,
    }

    // find admin by email
    const result = await this.sequelize.findOneByEmail(email);
    if (!result.isSuccess) {
      response.statusCode = 500;
      response.json = {
        message: result.message,
      };
      return response;
    }

    // decrypt password and compare with the password
    const compareResult = await hashPassword(password, result.data.password);
    if (!compareResult) {
      response.statusCode = 400;
      response.json = {
        message: "Wrong password",
      };
      return response;
    }

    // create JWT token
    const token = await generateToken(result.data);

    // send the token with bearer head to client
    response.json = {
      success: true,
      message: "Login success",
      token: "Bearer " + token,
    };
    response.statusCode = 200;
    return response;
  }
}



export default new AdminService();
