import autoBind from "auto-bind";

import SellerModel from "./SellerModel";
import BaseRepository from "../../../../base/BaseRepository";

class SellerRepository extends BaseRepository {
  constructor() {
    super(SellerModel);
    autoBind(this);
  }

  async findOneById(id) {
    try {
      const foundUser = await this.model.findOne({
        where: { id },
        raw: true,
      });

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
}

export default SellerRepository;
