import autoBind from "auto-bind";
import { createValidate, loginValidate} from "./UserFactory";
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
        const newUser = await createValidate(data);``
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
        const newUser = await loginValidate(data);
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
        // create token
        const payload = {
            id: checkEmailResult.data.id,
            email: checkEmailResult.data.email,
            name: checkEmailResult.data.name,
        }
        const jwtToken = await createJWT(payload);
        response.statusCode = 200;
        response.json = {
            success: true,
            token: jwtToken,
        }
        return response;
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

    // get user by id
    async getUserById(id) {
        const response = {
            json: null,
            statusCode: null,
        };
        const result = await userRepository.findOneById(id);
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

    // get user by email
    async getUserByEmail(email) {
        const response = {
            json: null,
            statusCode: null,
        };
        const result = await userRepository.findOneByEmail(email);
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