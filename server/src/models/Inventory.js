// models/Inventory.js
import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import { v4 as uuidv4 } from "uuid";

const Inventory = sequelize.define(
  "Inventory",
  {
    inventory_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: "products", // Use table name here
        key: "product_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "inventories",
    timestamps: true,
  }
);

export default Inventory;
