import React, { useEffect, useState } from "react";

import CartCard from "@/components/CartCard";
import Header from "@/components/Header";
import { axiosInstance } from "@/utils/axiosInstance";
import toaster from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders");
      setOrders(res?.data?.orders);
    } catch (error) {
      toaster.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const groupedOrders = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});

  console.log(groupedOrders);

  return (
    <div className="flex flex-col gap-20">
      <Header
        heading="My Orders"
        subheading="Relive the joy of your past purchases... and maybe some buyer's remorse!"
      />

      <div className="w-full flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full flex flex-col gap-1">
          {orders && orders.length > 0 ? (
            Object.keys(groupedOrders).map((date) => (
              <div key={date} className="mb-5">
                <h2 className="text-xl font-semibold mb-2">{date}</h2>
                <div className="flex flex-col gap-1">
                  {groupedOrders[date].map((order) => {
                    return order.products.map((product) => (
                      <CartCard
                        key={product?.productId}
                        data={product}
                        viewOnly
                      />
                    ));
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center h-40 ">
              <p className="text-zinc-500">You haven't ordered yet!</p>
              <Link to="/products" className="text-purple-600 underline">
                Start shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
