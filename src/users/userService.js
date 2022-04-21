import User from "./userModel";
import BaseSevice from "../../base/BaseService";
import autoBind from "auto-bind";

class UserService extends BaseSevice {
  constructor() {
    super(User);
    autoBind(this);
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
  async registerUser(data) {
    try {
      await this.model.create({
        email: data.email,
        password: data.password,
        phone: data.phone,
        name: data.name,
        mailSecretCode: data.code,
        image: data.image,
        registerType: "registered",
      });
      return { message: "Register new user successfully!" };
    } catch (error) {
      console.error(error);
      return {
        error: error.message || "Some error occurred while creating User!",
      };
    }
  }
}

export default UserService;
