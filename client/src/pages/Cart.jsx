import CartCard from "@/components/CartCard";
import Header from "@/components/Header";
import React from "react";

export default function Cart() {
  return (
    <div className="flex flex-col gap-20">
      <Header heading="Cart" subheading="Your cart items" />

      <div className="w-full flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full flex flex-col gap-1">
          <CartCard />
          <CartCard />
        </div>
        <div className="border md:max-w-xs w-full h-max p-2 rounded-md bg-zinc-50">
          <div className="flex flex-col gap-4">
            <div className="font-semibold flex flex-col justify-end items-end w-full">
              <span className="font-medium text-zinc-500">Total </span>
              <span className="text-2xl text-zinc-700">₹500</span>
            </div>

            <div className="w-full border-t"></div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-700">Subtotal </span>
                <span className="">₹500</span>
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

            <button className="bg-primary text-white px-4 py-2 rounded-md">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
