import { NotFoundError } from "../errors/CustomError.js";
import { sendResponseWithoutPassword } from "../utils/server.utils.js";

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(options = {}) {
    return this.repository.findAll(options);
  }

  async getUserById(id) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundError();
    return sendResponseWithoutPassword(user);
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
