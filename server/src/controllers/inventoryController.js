import inventoryService from "../services/inventoryService.js";
import { NotFoundError, ValidationError } from "../errors/CustomError.js";
import asyncHandler from "../middlewares/asyncHandler.js";

class InventoryController {
  constructor() {
    this.inventoryService = new inventoryService();

    // Bind methods to the class instance
    this.getAllProductsInInventory = this.getAllProductsInInventory.bind(this);
    this.getInventoryById = this.getInventoryById.bind(this);
    this.createInventory = this.createInventory.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);
  }

  getAllProductsInInventory = asyncHandler(async (req, res, next) => {
    const inventory = await this.inventoryService.getAllProducts();
    res.json(inventory);
  });

  getInventoryByProductId = asyncHandler(async (req, res, next) => {
    const inventory = await this.inventoryService.getByProductId(req.params.id);
    res.json(inventory);
  });

  getInventoryById = asyncHandler(async (req, res, next) => {
    const inventory = await this.inventoryService.getById(req.params.id);
    res.json(inventory);
  });

  createInventory = asyncHandler(async (req, res, next) => {
    const inventory = await this.inventoryService.create(req.body);
    res.status(201).json({ data: inventory });
  });

  updateInventory = asyncHandler(async (req, res, next) => {
    const inventory = await this.inventoryService.update(
      req.params.id,
      req.body
    );
    res.json({ data: inventory });
  });

  deleteInventory = asyncHandler(async (req, res, next) => {
    await this.inventoryService.deleteProductInventory(req.params.id);
    res.status(204).json({ message: "Inventory item deleted successfully" });
  });
}

export default InventoryController;
