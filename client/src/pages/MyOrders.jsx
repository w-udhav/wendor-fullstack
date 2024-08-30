import CartCard from "@/components/CartCard";
import Header from "@/components/Header";
import React from "react";

export default function MyOrders() {
  return (
    <div className="flex flex-col gap-20">
      <Header heading="My Orders" subheading="My purchased items" />

      <div className="w-full flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full flex flex-col gap-1">
          <CartCard viewOnly={true} />
          <CartCard viewOnly={true} />
        </div>
      </div>
    </div>
  );
}
