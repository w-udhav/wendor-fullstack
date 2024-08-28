class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(options = {}) {
    return this.repository.findAll(options);
  }

  async getById(id) {
    return this.repository.findById(id);
  }

  async create(data) {
    return this.repository.create(data);
  }

  async update(id, data) {
    return this.repository.update(id, data);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}

export default BaseService;
