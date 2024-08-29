import categoryService from "../services/categoryService.js";
import { NotFoundError, ValidationError } from "../errors/CustomError.js";

class CategoryController {
  constructor() {
    this.categoryService = new categoryService();
  }

  async getAllCategories(req, res, next) {
    try {
      const categories = await this.categoryService.getAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const category = await this.categoryService.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async updateCategory(req, res, next) {
    try {
      const category = await this.categoryService.update(
        req.params.id,
        req.body
      );
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      res.json(category);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const category = await this.categoryService.delete(req.params.id);
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
