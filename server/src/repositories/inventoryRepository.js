import BaseRepository from "./baseRepository.js";
import Inventory from "../models/Inventory.js";

class InventoryRepository extends BaseRepository {
  constructor() {
    super(Inventory);
  }
}

export default InventoryRepository;
