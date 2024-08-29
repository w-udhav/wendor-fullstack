import BaseRepository from "./baseRepository.js";
import User from "../models/User.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async create(data) {
    const user = await this.model.create(data);
    return user;
  }
}

export default UserRepository;
