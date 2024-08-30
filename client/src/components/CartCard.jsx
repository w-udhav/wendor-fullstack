import React from "react";
import Icon from "./Icon";
import { defaultProductImage } from "@/utils/constants";

const rawData = {
  name: "Product Name",
  category: "Category",
  price: 100,
  quantity: 5,
};

export default function CartCard({ data = rawData, viewOnly = false }) {
  return (
    <div className="max-w-screen-md border bg-zinc-50 rounded-md">
      <div className="flex items-center gap-4 p-2">
        <div className="w-28 h-28 bg-zinc-50 rounded-md">
          <img src={defaultProductImage} alt="" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-zinc-800 font-medium">
            {data?.name || "Name"}
          </div>
          <div className="text-sm text-gray-500">
            {data?.category || "category"}
          </div>
          <div className="text-xl font-medium">₹{data?.price}</div>
        </div>
      </div>
      <div
        className={`flex ${
          viewOnly ? "justify-end" : "justify-between"
        } items-center p-2`}
      >
        {!viewOnly && (
          <div className="flex items-center gap-4">
            <button className="bg-black rounded-md p-2 flex items-center justify-center w-8 h-8">
              <Icon name="remove" className="text-white text-sm" />
            </button>
            <div className="font-semibold">{data?.quantity}</div>
            <button className="bg-black rounded-md p-2 flex items-center justify-center w-8 h-8">
              <Icon name="add" className="text-white text-xl" />
            </button>
          </div>
        )}
        <div className="font-semibold">
          <span className="font-medium text-zinc-500">Subtotal: </span>
          <span className="text-lg">₹{data?.price * data?.quantity}</span>
        </div>
      </div>
    </div>
  );
}
