import autoBind from "auto-bind";

import AdminModel from "./AdminModel";
import BaseRepository from "../../../base/BaseRepository";

class AdminRepository extends BaseRepository {
  constructor() {
    super(AdminModel);
    autoBind(this);
  }
}

export default AdminRepository;
