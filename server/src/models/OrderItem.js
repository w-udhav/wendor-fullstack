import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuid } from "uuid";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.INTEGER,
      allowNull: falsel,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
  }
);

export default OrderItem;
