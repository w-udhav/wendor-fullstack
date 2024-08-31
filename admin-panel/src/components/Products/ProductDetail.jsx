import React, { useEffect, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Input2 from "../Input2";

import { categories } from "@/utils/constants";
import { axiosInstance } from "@/utils/axiosInstance";
import { Select, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function ProductDetail({ refreshData, product, clearSelected }) {
  const { id, name, price, category, display_img } = product;

  const [productName, setProductName] = useState(name);
  const [productPrice, setProductPrice] = useState(price);
  const [productCategory, setProductCategory] = useState(category);
  const [productImage, setProductImage] = useState(display_img);

  useEffect(() => {
    setProductName(name);
    setProductPrice(price);
    setProductCategory(category);
    setProductImage(display_img);
  }, [product]);

  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(`/product/${id}`, {
        name: productName,
        price: productPrice,
        category: productCategory,
        display_img: productImage,
      });
      if (res.status === 200) {
        toast.success("Product updated successfully");
        console.log("Product updated successfully");
        refreshData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full pl-4">
      <div className="p-3 px-4 pl-0 w-full flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <button
            className="flex items-center justify-center"
            onClick={clearSelected}
          >
            <Icon name="close" className="text-zinc-500 font-bold" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="text-sm flex items-center py-2"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="p-4 pt-5 pl-0 flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-zinc-400">
            Name
          </label>
          <Input2
            type="text"
            id="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-zinc-400">
            Price
          </label>
          <Input2
            type="number"
            id="price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-zinc-400">
            Category
          </label>
          <div className="relative">
            <Select
              label={category}
              variant="flat"
              className="w-full"
              name="category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <SelectItem value={cat} key={cat}>
                  {cat}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-zinc-400">
            Image
          </label>
          <Input2
            type="text"
            id="display_img"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
          <Button
            className="text-sm flex items-center justify-center py-2"
            disabled={true}
          >
            <Icon name="add" className="font-medium" /> Upload Image
          </Button>
        </div>
      </div>
    </div>
  );
}
