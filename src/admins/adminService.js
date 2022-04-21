import Admin from "./adminModel";
import BaseSevice from "../../base/BaseService";
import autoBind from "auto-bind";

class AdminService extends BaseSevice {
  constructor() {
    super(Admin);
    autoBind(this);
  }
  async getAllAdmins() {
    try {
      const adminList = await this.model.findAll({
        attributes: { exclude: ["password", "updatedAt"] },
      });
      return adminList;
    } catch (error) {
      console.error(error);
      return {
        error:
          error.message || "Some error occurred while getting admins list!",
      };
    }
  }
  async findOneByEmail(email) {
    try {
      const foundUser = await this.model.findOne({ email: email });
      return foundUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async createAnAdmin(data) {
    try {
      const { fullName, email, password, phone, address } = data;
      await this.model.create({ fullName, email, password, phone, address });
      return { message: "Create admin successfully!" };
    } catch (error) {
      console.error(error);
      return {
        error: error.message || "Some error occurred while creating admin!",
      };
    }
  }
  async findOneById(adminId) {
    try {
      const foundUser = await Admin.findOne({
        where: { id: adminId },
        attributes: { exclude: "password" },
      });
      return foundUser;
    } catch (error) {
      console.error(error);
    }
  }
}

export default AdminService;
