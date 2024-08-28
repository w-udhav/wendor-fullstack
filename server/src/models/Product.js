import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js";
import { v4 as uuidv4 } from "uuid";

const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    display_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.UUID,
      references: {
        model: "categories", // Use table name here
        key: "category_id",
      },
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
