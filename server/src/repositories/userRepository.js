import BaseRepository from "./baseRepository";
import User from "../models/User";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }

  async findById(id) {
    return await this.model.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async create(data) {
    return await this.model.create(data, {
      attributes: { exclude: ["password"] },
    });
  }
}

export default UserRepository;
