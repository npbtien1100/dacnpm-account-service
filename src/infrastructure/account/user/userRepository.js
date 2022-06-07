import autoBind from "auto-bind";

import UserModel from "./userModel";
import BaseRepository from "../../../../base/BaseRepository";

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
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

export default UserRepository;
