import BaseRepository from "./baseRepository.js";
import Product from "../models/Product.js";

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async createInBulk(bulkProducts) {}

  async findByCategory(category) {
    return await Product.findAll({ where: { category } });
  }
}

export default ProductRepository;
