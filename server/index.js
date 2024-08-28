import express from "express";
import sequelize from "./src/config/database.js";

import { errorHandler } from "./src/middlewares/errorHandler.js";

import User from "./src/models/User.js";
import Category from "./src/models/Category.js";
import Product from "./src/models/Product.js";
import Inventory from "./src/models/Inventory.js";

// Set up associations
Product.belongsTo(Category, { foreignKey: "category_id" });
Inventory.belongsTo(Product, { foreignKey: "product_id" });

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(errorHandler);

const PORT = 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
