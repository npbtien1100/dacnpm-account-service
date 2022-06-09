import autoBind from "auto-bind";

import SellerModel from "./SellerModel";
import BaseRepository from "../../../../base/BaseRepository";

class SellerRepository extends BaseRepository {
  constructor() {
    super(SellerModel);
    autoBind(this);
  }
}

export default SellerRepository;
