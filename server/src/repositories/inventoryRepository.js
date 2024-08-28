import BaseRepository from "./baseRepository";
import Inventory from "../models/Inventory";

class InventoryRepository extends BaseRepository {
  constructor() {
    super(Inventory);
  }
}

export default InventoryRepository;
