import User from "../models/User.js";

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return this.model.findAll({ where: { role: "user" } });
  }

  async findById(id) {
    return await User.findOne({ where: { user_id: id } });
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    const record = await this.findById(id);
    if (!record) {
      throw new Error("Record not found");
    }
    return record.update(data);
  }

  async delete(id) {
    await this.model.destroy({ where: { user_id: id } });
  }
}

export default BaseRepository;
