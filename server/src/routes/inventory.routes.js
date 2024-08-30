import { Router } from "express";
import { verifyUser } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

import InventoryController from "../controllers/inventoryController.js";

const router = Router();
const inventoryController = new InventoryController();

router.get(
  "/",
  inventoryController.getAllProductsInInventory.bind(inventoryController)
);
router.post(
  "/create",
  verifyUser,
  isAdmin,
  inventoryController.createInventory.bind(inventoryController)
);
router.put(
  "/:id",
  verifyUser,
  isAdmin,
  inventoryController.updateInventory.bind(inventoryController)
);
router.delete(
  "/:id",
  verifyUser,
  isAdmin,
  inventoryController.deleteInventory.bind(inventoryController)
);

export default router;
