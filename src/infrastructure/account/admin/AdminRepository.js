import autoBind from "auto-bind";

import AdminModel from "./AdminModel";
import BaseRepository from "../../../../base/BaseRepository";

class AdminRepository extends BaseRepository {
  constructor() {
    super(AdminModel);
    autoBind(this);
  }

  async findAll(page, limit) {
    const result = await this.model.findAll(
      {
        offset: page,
        limit: limit,
        raw: true
      }
    );
    return result;
  }

  async findOneByID(id) {
    const result = await this.model.findOne({
      where: { id: id },
      raw: true
    });
    return result;
  }
}

export default AdminRepository;
