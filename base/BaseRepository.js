import autoBind from "auto-bind";

class BaseRepository {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async findOneByEmail(email) {
    try {
      const foundUser = await this.model.findOne({where: {email: email}});

      if (foundUser) {
        return {
          isSuccess: true,
          data: foundUser,
        };
      }
      return {
        isSuccess: false,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async create(data) {
    try {
      await this.model.create(data);

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
}

export default BaseRepository;
