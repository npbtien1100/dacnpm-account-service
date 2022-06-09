import SellerService from "../../../domain/account/seller/SellerService.js";
import BaseController from "../../../../base/BaseController.js";
import autoBind from "auto-bind";

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
}

export default new SellerController();
