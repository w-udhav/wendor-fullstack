import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import OrderCard from "@/components/MyOrders/OrderCard";
import SectionHeading from "@/components/SectionHeading";

const CACHE_TTL = 30 * 60 * 1000;

export default function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("orderHistory");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        setOrders(parsed.orders);
      } else {
        localStorage.removeItem("orderHistory");
      }
    }
  }, []);

  const groupedOrders = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-20">
      <Header
        heading="Order History"
        subheading="Your recent purchases, cached locally for 30 minutes."
      />

      <div className="w-full flex flex-col gap-1">
        {orders.length > 0 ? (
          Object.keys(groupedOrders).map((date) => (
            <div key={date}>
              <SectionHeading title={date} />
              <div className="flex flex-col gap-2">
                {groupedOrders[date].map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-40">
            <p className="text-zinc-500">No recent orders</p>
            <Link to="/products" className="text-purple-600 underline">
              Start shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
