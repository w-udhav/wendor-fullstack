import React from "react";

export default function OrderCard({ order }) {
  // order will contain multiple products
  return (
    <div className="max-w-screen-md border bg-zinc-50 rounded-md p-2">
      <div className="flex flex-col gap-4">
        {order?.products.map((product, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-black font-medium">{product?.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-700">Subtotal </span>
                <div className="flex items-center gap-4">
                  <span className="font-medium">x{product?.quantity}</span>
                  <span>₹{product?.purchasePrice}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-700">Tax </span>
                <span className="">+ ₹0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-700">Discount </span>
                <span className="">- ₹0</span>
              </div>
            </div>
            <div className="w-full border-t"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center pt-2">
        <div className="font-semibold">
          <span className="font-medium text-zinc-500">Subtotal: </span>
          <span className="text-lg">₹{order?.orderTotal}</span>
        </div>
      </div>
    </div>
  );
}
