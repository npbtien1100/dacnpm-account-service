/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
// Handle business
import autoBind from "auto-bind";

import { createAdminsFromArray, createAdmin } from "./AdminFactory";
import { hashPassword } from "../../../utils/Utility";
import BaseService from "../../../../base/BaseService";
import AdminRepository from "../../../infrastructure/account/admin/AdminRepository";
import HttpError from "../../../utils/HttpError";
import HttpResponse from "../../../utils/HttpResponse";
import MailerHepler from "../../../../helper/email/EmailHelper";

const adminRepository = new AdminRepository();
const emailer = new MailerHepler();

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
      return new HttpError({ statusCode: 400, message: newAdmin.errMessage });
    }

    // Check Email Exist
    const checkEmailResult = await adminRepository.findOneByEmail(data.email);

    console.log(checkEmailResult);

    if (!checkEmailResult.isSuccess) {
      return new HttpError({
        statusCode: 400,
        message: "Email has already registered",
      });
    }

    // HashPassword
    newAdmin.info.password = await hashPassword(newAdmin.info.password);

    // Create new admin
    const result = await adminRepository.create(newAdmin.info);
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

  async loginAdmin(data) {
    const response = {
      json: null,
      statusCode: null,
    };

    // Validate

    const result = await loginAdmin(data);
    if (result.error) {
      response.statusCode = 400;
      response.json = {
        message: result.message,
      };
      return response;
    }

    // Check Email Exist
    const admin = await adminRepository.findOneByEmail(data.email);
    if (!admin.isSuccess) {
      response.statusCode = 400;
      response.json = {
        error: true,
        message: "The email you entered is not registered.",
      };
      return response;
    }

    // Check Password
    const isValid = await validPassword(data.password, admin.data.password);
    if (!isValid) {
      response.statusCode = 400;
      response.json = {
        error: true,
        message: "The password you entered is not correct.",
      };
      return response;
    }

    // JWT
    const token = createJWT({ id: admin.data.id });

    response.statusCode = 200;

    const user = admin.data;
    delete user.password;

    response.json = {
      success: true,
      user,
      token,
      expiresIn: 10000000,
    };
    return response;
  }

  async getAll(page, limit) {
    const response = {
      json: null,
      statusCode: null,
    };

    const result = await adminRepository.findAll(page, limit);
    if (!result) {
      response.statusCode = 500;
      response.json = {
        message: "Error when get all admin",
      };
      return response;
    }
    response.json = result;
    response.statusCode = 200;
    return response;
  }

  async getOne(id) {
    const response = {
      json: null,
      statusCode: null,
    };

    const result = await adminRepository.findOneByID(id);
    if (!result) {
      response.statusCode = 500;
      response.json = {
        message: "Error when get admin",
      };
      return response;
    }
    response.json = result;
    response.statusCode = 200;
    return response;
  }

  // the service for create new admin by email
  async createFromEmail(email) {
    const response = {
      json: null,
      statusCode: null,
    };

    // Check Email Exist
    const checkEmailResult = await adminRepository.findOneByEmail(email);

    if (checkEmailResult.isSuccess) {
      response.statusCode = 400;
      response.json = {
        success: false,
        message: "Email has already registered",
      };
      return response;
    }
    // generate password
    const password = generator.generate({
      length: 8,
      numbers: true,
    });

    // create a admin object to make a new admin model from admin factory
    const createdAdmin = {
      email,
      password,
      fullName: "admin",
    };

    // validate by admin factory
    const newAdmin = await createAdmin(createdAdmin);
    if (newAdmin.error) {
      response.statusCode = 400;
      response.json = {
        message: newAdmin.Message,
      };
      return response;
    }

    // HashPassword
    newAdmin.info.password = await hashPassword(newAdmin.info.password);

    // Create new admin
    const result = await adminRepository.create(newAdmin.info);
    if (!result.isSuccess) {
      response.statusCode = 500;
      response.json = {
        message: result.message,
      };
      return response;
    }

    console.log(
      `successfully created admin with email: ${email} and password: ${password}`,
    );
    // sending Email to new admin
    // eslint-disable-next-line no-unused-vars
    const emailResult = await this.sendEmail(email, password);
    response.json = result;
    response.statusCode = 200;
    return response;
  }

  // the service for sending email to new admin
  async sendEmail(email, password) {
    return true;
  }
  
  async checkAdminExist(id, name) {
    const response = {
      json: null,
      statusCode: null,
    };

    const result = await adminRepository.findOneByNameAndId(id, name);
    if (!result) {
      response.statusCode = 500;
      response.json = {
        message: "Error when get admin",
      };
      return response;
    }
    response.json = result;
    response.statusCode = 200;
    return response;
  }
  
   async inviteAdmins(emails) {
    const admins = createAdminsFromArray(emails);

    if (admins.errMessage) {
      return new HttpError({ statusCode: 400, message: admins.errMessage });
    }
    // send mails
    const infos = await Promise.all([
      ...admins.info.map((admin) => emailer.sendInvitationsToAdmin(admin)),
    ]);
    infos.map((e) => console.log(`Email sent: ${e.response}`));

    // insert into db
    const tempAdmins = admins.info.map(async (admin) => {
      admin.password = await hashPassword(admin.password);
      return admin;
    });
    const newAdmins = await Promise.all(tempAdmins);
    const result = await this.repository.createMany(newAdmins);

    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse({
      isSuccess: true,
      message: "Create invitations successfully!",
    });
  }
}

export default new AdminService();
