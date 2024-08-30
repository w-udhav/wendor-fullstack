import BaseRepository from "./baseRepository.js";
import Inventory from "../models/Inventory.js";
import { InternalServerError } from "../errors/CustomError.js";
import sequelize from "../config/database.js";
import Product from "../models/Product.js";

class InventoryRepository extends BaseRepository {
  constructor() {
    super(Inventory);
  }

  async findByProductId(id) {
    return await Inventory.findOne({ where: { productId: id } });
  }

  async getAllProducts() {
    return await Inventory.findAll({
      attributes: [
        ["id", "inventoryId"],
        "productId",
        "quantity",
        [sequelize.col("product.name"), "productName"],
        [sequelize.col("product.price"), "productPrice"],
        [sequelize.col("product.category"), "productCategory"],
        [sequelize.col("product.display_img"), "display_img"],
      ],
      include: [
        {
          model: Product,
          as: "product",
          attributes: [],
        },
      ],
      group: [
        "Inventory.id",
        "productId",
        "product.id",
        "product.name",
        "product.price",
        "product.category",
        "quantity",
      ],
      having: sequelize.literal("quantity > 0"),
    });
  }

  async deleteByProductId(id) {
    try {
      await Inventory.destroy({ where: { productId: id } });
    } catch (error) {
      throw new InternalServerError(
        error.message || "Error deleting inventory by product id"
      );
    }
  }
}

export default InventoryRepository;
