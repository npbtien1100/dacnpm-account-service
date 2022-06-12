import autoBind from "auto-bind";
import SellerService from "../../../domain/account/seller/SellerService.js";
import BaseController from "../../../../base/BaseController";

const sellerService = new SellerService();

class SellerController extends BaseController {
  constructor() {
    super(sellerService);
    autoBind(this);
  }

  async login(req, res, next) {
    try {
      const data = req.body;
      const result = await sellerService.login(data);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res, next) {
    try {
      const data = req.body;
      const result = await sellerService.register(data);

      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }
  async getSellerById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await sellerService.getSellerById(id);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }
  async updateSeller(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await sellerService.updateSeller(id, data);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SellerController();
