// Handle business
import autoBind from "auto-bind";
import { loginSeller, createSeller } from "./SellerFactory";
import BaseService from "../../../../base/BaseService";
import SellerRepository from "../../../infrastructure/account/seller/SellerRepository";
import {
  validPassword,
  hashPassword,
  makeCode,
} from "../../../../helper/Utility.js";
import { createJWT } from "../../../auth/auth.services";
import MailerHepler from "../../../../helper/email/EmailHelper";

const sellerRepository = new SellerRepository();

class SellerService extends BaseService {
  constructor() {
    super(sellerRepository);
    autoBind(this);
  }

  async register(data) {
    const response = {
      json: null,
      statusCode: null,
    };

    // Validate data and create object
    const newASeller = await createSeller(data);
    if (newASeller.error) {
      response.statusCode = 400;
      response.json = {
        message: newASeller.Message,
      };
      return response;
    }

    // Check Email Exist
    const checkEmailResult = await sellerRepository.findOneByEmail(data.email);

    if (checkEmailResult.isSuccess) {
      response.statusCode = 400;
      response.json = {
        success: false,
        message: "Email has already registered",
      };
      return response;
    }

    // HashPassword
    newASeller.info.password = await hashPassword(newASeller.info.password);

    const code = makeCode();
    // console.log(code);
    newASeller.info.code = code;
    console.log(newASeller.info);

    // Create new sller
    const result = await sellerRepository.create(newASeller.info);
    if (!result.isSuccess) {
      response.statusCode = 500;
      response.json = {
        message: result.message,
      };
      return response;
    }

    //Send Email to seller
    const mailer = new MailerHepler();

    const seller = {
      link: process.env.URL_FRONT_END + "/api/verify-seller?code=" + code,
    };
    const mailResult = await mailer.sendRegisterSeller(
      "SHOPPING",
      data.email,
      seller
    );

    response.json = result;
    response.statusCode = 200;
    return response;
  }

  async login(data) {
    const response = {
      json: null,
      statusCode: null,
    };

    // Validate

    const result = await loginSeller(data);
    if (result.error) {
      response.statusCode = 400;
      response.json = {
        message: result.message,
      };
      return response;
    }

    // Check Email Exist
    const seller = await sellerRepository.findOneByEmail(data.email);
    if (!seller.isSuccess) {
      response.statusCode = 400;
      response.json = {
        error: true,
        message: "The email you entered is not registered.",
      };
      return response;
    }
    //Check Password
    const isValid = await validPassword(data.password, seller.data.password);
    if (!isValid) {
      response.statusCode = 400;
      response.json = {
        error: true,
        message: "The password you entered is not correct.",
      };
      return response;
    }

    //JWT
    const token = createJWT({ id: seller.data.id });

    response.statusCode = 200;

    let user = seller.data;
    delete user.password;

    response.json = {
      success: true,
      user: user,
      token: token,
      expiresIn: 10000000,
    };
    return response;
  }
}

export default SellerService;
