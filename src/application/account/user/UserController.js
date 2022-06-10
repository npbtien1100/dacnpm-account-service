import BaseController from "../../../../base/BaseController"
import autoBind from "auto-bind";
import { getPage } from "../../../../utils/Pagination";
import UserService from "../../../domain/account/user/UserService";

class UserController extends BaseController {
    constructor() {
        super(UserService);
        autoBind(this);
    }

    async login(req, res, next) {
        try {
            const data = req.body;
            const result = await UserService.loginUser(data);
            res.status(result.statusCode).json(result.json);
        } catch (error) {
            console.log(error);
        }
    }

    async register(req, res, next) {
        try {
            const data = req.body;
            const result = await UserService.createUser(data);
            res.status(result.statusCode).json(result.json);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const reqPage = req.query.page;
            const page = getPage(reqPage);
            const limit = parseInt(process.env.PAGE_LIMIT);
            const result = await UserService.getAll(page, limit);
            res.status(result.statusCode).json(result.json);
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id
            const result = await UserService.getUserById(id);
            res.status(result.statusCode).json(result.json);
        } catch (error) {
            console.log(error);
        }
    }

    async getOneByEmail(req, res, next) {
        try {
            const email = req.body.email;
            const result = await UserService.getUserByEmail(email);
            res.status(result.statusCode).json(result.json);
        } catch (error) {
            console.log(error);
        }
    }

    async createFromEmail(req, res, next) {
        try {
            const email = req.body.email;
            const result = await UserService.createFromEmail(email);
            res.status(result.statusCode).json(result.json);
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res, next) {
        try {
            const data = req.body;
            const result = await UserService.create(data);
            res.status(result.statusCode).json(result.json);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserController();