import { Router } from "express";

import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import orderRoutes from "./order.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/orders", orderRoutes)

export default router;
