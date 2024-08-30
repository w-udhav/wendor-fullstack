import { NotFoundError } from "../errors/CustomError.js";

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  async findById(id) {
    console.log(id);
    return await this.model.findOne({ where: { id } });
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    const record = await this.model.findByPk(id);
    if (!record) {
      throw new NotFoundError("Record not found");
    }
    console.log(record);
    return await record.update(data);
  }

  async delete(id) {
    await this.model.destroy({ where: { id } });
  }
}

export default BaseRepository;
