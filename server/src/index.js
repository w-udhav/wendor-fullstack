import express from "express";
import sequelize from "./config/database.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.routes.js";

import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Inventory from "./models/Inventory.js";

// Setting up associations
Product.belongsTo(Category, { foreignKey: "category_id" });
Inventory.belongsTo(Product, { foreignKey: "product_id" });

const app = express();

// Applying middleware
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World! You should not be here.");
});

// Routes
app.use("/api", routes);

const PORT = 3000;

// Main
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
// sequelize.sync();
main();
