import { Router } from "express";

import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import inventoryRoutes from "./inventory.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/inventory", inventoryRoutes);

export default router;
