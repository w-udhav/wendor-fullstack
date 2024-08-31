import React, { useEffect, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Input2 from "../Input2";

import { axiosInstance } from "@/utils/axiosInstance";
import { createInventory } from "@/utils/commonFunctions";
import toast from "react-hot-toast";

export default function InventoryDetail({
  refreshData,
  inventory,
  clearSelected,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    inventory?.productCategory || "Select Category"
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [quantity, setQuantity] = useState(inventory?.quantity || 0);

  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(
        `/inventory/${inventory.inventoryId}`,
        {
          quantity,
        }
      );
      if (res.status === 200) {
        toast.success("Product updated successfully");
        refreshData();
        console.log("Product updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };

  useEffect(() => {
    setQuantity(inventory?.quantity || 0);
  }, [inventory]);

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
          <label htmlFor="quantity" className="text-zinc-400">
            Quantity
          </label>
          <Input2
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
