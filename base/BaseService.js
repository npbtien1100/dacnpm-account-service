// import HttpResponse from "../helper/HttpResponse";

// import { getPage, getPageSize } from "../utils/Pagination";
import autoBind from "auto-bind";

class BaseService {
  constructor(sequelize) {
    this.sequelize = sequelize;
    autoBind(this);
  }

  async findOneByEmail(email) {
    console.log(email)
    return await this.sequelize.findOneByEmail(email);
  }

  // create HtthResponse
}

export default BaseService;
