class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    return this.model.findById(id);
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
    const record = await this.findById(id);
    if (!record) return null;
    return record.destroy();
  }
}

export default BaseRepository;
