/* eslint-disable class-methods-use-this */
import autoBind from "auto-bind";
import SellerService from "../../../domain/account/seller/SellerService";
import BaseController from "../../../../base/BaseController";

const sellerService = new SellerService();

class SellerController extends BaseController {
  constructor() {
    super(sellerService);
    autoBind(this);
  }

  async login(req, res) {
    try {
      const data = req.body;
      const result = await sellerService.login(data);
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    try {
      const data = req.body;
      const result = await sellerService.register(data);

      res.status(result.statusCode).json(result.json);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SellerController();
