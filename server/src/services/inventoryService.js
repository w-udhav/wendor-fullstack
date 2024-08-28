import BaseService from "./baseService.js";
import InventoryRepository from "../repositories/inventoryRepository.js";

class InventoryService extends BaseService {
  constructor() {
    const inventoryRepository = new InventoryRepository();
    super(inventoryRepository);
  }
}

export default InventoryService;
