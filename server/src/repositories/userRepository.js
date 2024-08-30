import BaseRepository from "./baseRepository.js";
import User from "../models/User.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findAll() {
    return this.model.findAll({ where: { role: "user" } });
  }

  async create(data) {
    const user = await this.model.create(data);
    return user;
  }
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

export default UserRepository;
