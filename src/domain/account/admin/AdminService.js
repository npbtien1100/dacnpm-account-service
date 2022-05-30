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
    const checkEmailResult = await this.repository.findOneByEmail(data.email);

    if (!checkEmailResult.isSuccess) {
      return new HttpError({
        statusCode: 400,
        message: "Email has already registered",
      });
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
