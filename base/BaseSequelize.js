import autoBind from "auto-bind";

class BaseSequelize {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async findOneByEmail(email) {
    try {
      const foundUser = await this.model.findOne({ email: email });

      if (foundUser) {
        return {
          isSuccess: true,
          data: foundUser,
        };
      } else {
        return {
          isSuccess: false,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false
      };
    }
  }

  async create(data) {
    try {
      const item = await this.model(data).save();

      return {
        isSuccess: true,
        message: "Register new admin successfully!",
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error: error.message || "Some error occurred while creating User!",
      };
    }
  }

  async findOneByEmailAdmin(email) {
    try {
      const foundUser = await this.model.findOne({ email: email, role: 'admin' });

      if (foundUser) {
        return {
          isSuccess: true,
          data: foundUser,
        };
      } else {
        return {
          isSuccess: false,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false
      };
    }
  }
}

export default BaseSequelize;
