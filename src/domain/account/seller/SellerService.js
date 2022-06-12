// Handle business
import autoBind from "auto-bind";
import { loginSeller, createSeller, updateSeller } from "./SellerFactory";
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
import { addToLog } from "../../../infrastructure/account/seller/sellerLog.repo";

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

    //hash password
    newASeller.info.data.password = await hashPassword(
      newASeller.info.data.password
    );

    newASeller.info.data = JSON.stringify(newASeller.info.data);

    const result = await addToLog(newASeller.info);

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
    // Check Password
    const isValid = await validPassword(data.password, seller.data.password);
    if (!isValid) {
      response.statusCode = 400;
      response.json = {
        error: true,
        message: "The password you entered is not correct.",
      };
      return response;
    }
    //check verify email
    // console.log(seller);
    if (!seller.data.isVerified) {
      response.statusCode = 400;
      response.json = {
        error: true,
        message: "Please verify your email before login.",
      };
      return response;
    }

    // JWT
    const token = createJWT({ id: seller.data.id });

    response.statusCode = 200;

    const user = seller.data;
    user.password = "";

    response.json = {
      success: true,
      user,
      token,
      expiresIn: 10000000,
    };
    return response;
  }

  async getSellerById(id) {
    const response = {
      json: null,
      statusCode: null,
    };
    const result = await sellerRepository.findOneById(id);
    if (!result.isSuccess) {
      response.statusCode = 400;
      response.json = {
        message: result.message,
      };
      return response;
    }
    response.statusCode = 200;
    response.json = result;
    return response;
  }
  async updateSeller(id, data) {
    const response = {
      json: null,
      statusCode: null,
    };
    // Add to log
    const sellerModel = await updateSeller(id, data);
    const result = await addToLog(sellerModel);
    if (!result.isSuccess) {
      response.statusCode = 500;
      response.json = {
        message: result.message,
      };
    } else {
      response.statusCode = 200;
      response.json = {
        message: "Update successfully",
      };
    }
    return response;
  }
}

export default SellerService;
