import { axiosInstance } from "./axiosInstance";

export const createInventory = async ({ productId, quantity }) => {
  try {
    const res = await axiosInstance.post("/inventory/create", {
      productId,
      quantity,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async (setProducts) => {
  try {
    const res = await axiosInstance.get("/product/all");
    setProducts(res.data);
  } catch (error) {
    throw error;
  }
};
