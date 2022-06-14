import autoBind from "auto-bind";

import AdminModel from "./AdminModel";
import BaseRepository from "../../../../base/BaseRepository";

class AdminRepository extends BaseRepository {
  constructor() {
    super(AdminModel);
    autoBind(this);
  }

  async findAll(page, limit) {
    const result = await this.model.findAll({
      offset: page,
      limit,
      raw: true,
    });
    return result;
  }

  async findOneByID(id) {
    const result = await this.model.findOne({
      where: { id },
      raw: true,
    });
    return result;
  }

  async findOneByNameAndId(id, name) {
    const result = await this.model.findOne({
      where: { id: id, name: name },
      raw: true
    });
    return result;
  }
}

export default AdminRepository;
