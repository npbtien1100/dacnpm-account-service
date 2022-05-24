import autoBind from "auto-bind";
class SellerController {
  constructor() {
    super(new SellerService());
    autoBind(this);
  }

  //Command
  async createASeller(req, res, next) {
    //validation
    //call factory to convert from dto to entity
    //call service to create a seller
  }
  async handleLogin(req, res, next) {
    //validation
    //call factory to convert from dto to entity
    //call service to handle login
  }

  //Query
  async getAll(req, res, next) {
    //call service to get all sellers
    //call factory to convert from entity to dto
  }
}

export default SellerController;
