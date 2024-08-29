import inventoryService from "../services/inventoryService.js";
import { NotFoundError, ValidationError } from "../errors/CustomError.js";

class InventoryController {
  constructor() {
    this.inventoryService = new inventoryService();
  }

  async getAllInventory(req, res, next) {
    try {
      const inventory = await this.inventoryService.getAll();
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  }

  async getInventoryById(req, res, next) {
    try {
      const inventory = await this.inventoryService.getById(req.params.id);
      if (!inventory) {
        throw new NotFoundError("Inventory item not found");
      }
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  }

  async createInventory(req, res, next) {
    try {
      const inventory = await this.inventoryService.create(req.body);
      res.status(201).json(inventory);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async updateInventory(req, res, next) {
    try {
      const inventory = await this.inventoryService.update(
        req.params.id,
        req.body
      );
      if (!inventory) {
        throw new NotFoundError("Inventory item not found");
      }
      res.json(inventory);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async deleteInventory(req, res, next) {
    try {
      const inventory = await this.inventoryService.delete(req.params.id);
      if (!inventory) {
        throw new NotFoundError("Inventory item not found");
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
