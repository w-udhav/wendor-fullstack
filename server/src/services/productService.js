import BaseService from "./baseService.js";
import { InternalServerError, ValidationError } from "../errors/CustomError.js";
import { defaultImageUrl } from "../utils/server.utils.js";

import ProductRepository from "../repositories/productRepository.js";
class ProductService extends BaseService {
  constructor() {
    const productRepository = new ProductRepository();
    super(productRepository);
    this.productRepository = productRepository;
  }

  async create(data) {
    try {
      if (!data.name || !data.price || !data.category)
        throw new ValidationError("All fields required!");

      if (!data.display_img) data.display_img = defaultImageUrl;

      return await this.productRepository.create(data);
    } catch (error) {
      throw new InternalServerError(error.message || "Error creating product");
    }
  }

  async createInBulk(dataArray) {
    try {
      if (!data.length) {
        throw new ValidationError("Array of products required!");
      }
      const bulkProducts = [];
      for (const data of dataArray) {
        if (!data.name || !data.price || !data.category) {
          throw new ValidationError("All fields required!");
        }
        if (!data.display_img) data.display_img = defaultImageUrl;
        bulkProducts.push(data);
      }
      return await this.productRepository.createInBulk(bulkProducts);
    } catch (error) {
      throw new InternalServerError(error.message || "Error creating products");
    }
  }

  async getAll() {
    try {
      return await this.productRepository.findAll();
    } catch (error) {
      throw new InternalServerError(error.message || "Error fetching products");
    }
  }

  async getById(id) {
    try {
      return await this.productRepository.getById(id);
    } catch (error) {
      throw new InternalServerError(error.message || "Error fetching product");
    }
  }

  async delete(id) {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}

export default ProductService;
