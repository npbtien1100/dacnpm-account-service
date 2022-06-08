import autoBind from "auto-bind";
import { createUser } from "./UserFactory";
import BaseService from "../../../../base/BaseService";
import UserRepository from "../../../infrastructure/account/user/UserRepository";
import { validPassword, hashPassword, makeCode } from "../../../../helper/Utility.js";
import { createJWT } from "../../../auth/auth.services";
import generator from 'generate-password';

const userRepository = new UserRepository();

class UserService extends BaseService {
    constructor() {
        super(userRepository);
        autoBind(this);
    }

    async createAnUser(data) {
        const response = {
            json: null,
            statusCode: null,
        };

        // Validate data and create object
        const newUser = await createAdmin(data);
        if (newUser.error) {
            response.statusCode = 400;
            response.json = {
                message: newUser.Message,
            };
            return response;
        }

        // Check Email Exist
        const checkEmailResult = await userRepository.findOneByEmail(data.email);

        if (checkEmailResult.isSuccess) {
            response.statusCode = 400;
            response.json = {
                success: false,
                message: "Email has already registered",
            };
            return response;
        }

        // HashPassword
        newUser.info.password = await hashPassword(newUser.info.password);

        // Create new user
        const result = await userRepository.create(newUser.info);
        if (!result.isSuccess) {
            response.statusCode = 500;
            response.json = {
                message: result.message,
            };
            return response;
        }

        response.json = result;
        return response;
    }

    async loginAnUser(data) {
        const response = {
            json: null,
            statusCode: null,
        };

        // Validate data and create object
        const newUser = await loginAdmin(data);
        if (newUser.error) {
            response.statusCode = 400;
            response.json = {
                message: newUser.Message,
            };
            return response;
        }

        // Check Email Exist
        const checkEmailResult = await userRepository.findOneByEmail(data.email);

        if (!checkEmailResult.isSuccess) {
            response.statusCode = 400;
            response.json = {
                success: false,
                message: "Email or password is incorrect",
            };
            return response;
        }

        // Check Password
        const check = await validPassword(data.password, checkEmailResult.data.password);
        if (!check) {
            response.statusCode = 400;
            response.json = {
                success: false,
                message: "Email or password is incorrect",
            };
            return response;
        }
    }

    // get all user 
    async getAll(page) {
        const response = {
            json: null,
            statusCode: null,
        };

        const offset = parseInt(process.env.PAGE_LIMIT) * page
        const result = await userRepository.findAll(offset, parseInt(process.env.PAGE_LIMIT));
        if (!result) {
            response.statusCode = 500;
            response.json = {
                message: result.message,
            };
            return response;
        }

        response.statusCode = 200;
        response.json = result;
        return response;
    }
}

export default new UserService();