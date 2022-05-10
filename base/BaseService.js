// import HttpResponse from "../helper/HttpResponse";

// import { getPage, getPageSize } from "../utils/Pagination";
import autoBind from "auto-bind";

class BaseService {
  constructor(repository) {
    this.repository = repository;
    autoBind(this);
  }

  async findOneByEmail(email) {
    console.log(email);
    return await this.repository.findOneByEmail(email);
  }

  // create HtthResponse
}

export default BaseService;
