import BaseService from "./baseService.js";
import InventoryRepository from "../repositories/inventoryRepository.js";
import { InternalServerError } from "../errors/CustomError.js";

class InventoryService extends BaseService {
  constructor() {
    const inventoryRepository = new InventoryRepository();
    super(inventoryRepository);
    this.inventoryRepository = inventoryRepository;
  }

  async create(productData) {
    try {
      if (productData.quantity <= 0) {
        throw new InternalServerError("Quantity must be greater than 0");
      }
      const existingInventory = await this.inventoryRepository.findByProductId(
        productData.productId
      );

      if (existingInventory) {
        const quantity = existingInventory.quantity + productData.quantity;
        return await this.inventoryRepository.update(existingInventory.id, {
          quantity,
        });
      }

      return await this.inventoryRepository.create(productData);
    } catch (error) {
      throw new InternalServerError(error.message || "Error creating product");
    }
  }

  async getAllProducts() {
    return await this.inventoryRepository.getAllProducts();
  }

  async deleteProductInventory(id) {
    try {
      await this.inventoryRepository.deleteByProductId(id);
    } catch (error) {
      throw new InternalServerError(
        error.message || "Error deleting inventory by product id"
      );
    }
  }
}

export default InventoryService;
