import BaseService from "./baseService.js";
import InventoryRepository from "../repositories/inventoryRepository.js";

class InventoryService extends BaseService {
  constructor() {
    const inventoryRepository = new InventoryRepository();
    super(inventoryRepository);
  }

  async getAll() {
    return this.repository.getAll();
  }

  async delete(id) {}
}

export default InventoryService;
