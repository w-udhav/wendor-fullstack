import productService from "../services/productService.js";
import { NotFoundError, ValidationError } from "../errors/CustomError.js";

class ProductController {
  constructor() {
    this.productService = new productService();
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await this.productService.getAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const product = await this.productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await this.productService.update(req.params.id, req.body);
      if (!product) {
        throw new NotFoundError("Product not found");
      }
      res.json(product);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product = await this.productService.delete(req.params.id);
      if (!product) {
        throw new NotFoundError("Product not found");
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
