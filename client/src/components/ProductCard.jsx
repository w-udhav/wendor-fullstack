import { defaultProductImage } from "@/utils/constants";
import React from "react";

export default function ProductCard({ data }) {
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  return (
    <div className="w-full min-h-[15rem] md:min-h-[20rem] max-h-[25rem] rounded-md p-2 relative border bg-zinc-50">
      <div className="w-full h-full  flex flex-col justify-between gap-2">
        {/* Image container */}
        <div className="flex items-center justify-center bg-white">
          <div className="w-full h-full">
            <img
              src={data?.image || defaultProductImage}
              alt={data?.name}
              className="w-full h-full object-cover rounded-md border"
            />
          </div>
        </div>

        {/* Product details */}
        <div>
          <p className="text-xs text-zinc-500">{data?.category}</p>
          <p className="text-zinc-700 font-medium">{data?.name || "Name"}</p>
          <div className="w-full flex items-center justify-between gap-2 pt-2">
            <h2 className="text-xl font-medium  rounded-md flex-1">
              ₹ {data?.price || "0.00"}{" "}
            </h2>
            <button className="bg-black text-white px-2 py-1 rounded-[3px] text-sm">
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
      {isAddedToCart && (
        <div className="absolute top-0 left-0">
          <div className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-primary text-white">
            3
          </div>
        </div>
      )}
    </div>
  );
}
