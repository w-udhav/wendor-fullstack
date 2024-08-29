import BaseRepository from "./baseRepository.js";
import User from "../models/User.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async create(data) {
    const user = await this.model.create(data);
    return user;
  }
}

export default UserRepository;
