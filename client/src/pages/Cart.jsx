import { useCart } from "@/context/CartContext";
import React, { useEffect, useState } from "react";

import CartCard from "@/components/CartCard";
import Header from "@/components/Header";
import { Spinner } from "@nextui-org/react";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Cart() {
  const { cart, updateCart, calculateCartValue, emptyCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/orders/create", cart);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setTimer(
      setTimeout(() => {
        emptyCart();
        setLoading(false);
      }, 3000)
    );
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <div className="flex flex-col gap-20">
      <Header
        heading="Cart"
        subheading="Where your dreams come true... if your dreams are made of snacks and gadgets!"
      />
      {cart.length > 0 ? (
        <div className="w-full flex flex-col-reverse md:flex-row gap-5">
          <div className="w-full flex flex-col gap-1">
            {cart.map((item) => (
              <CartCard
                key={item?.productId}
                data={item}
                handleIncrement={() => updateCart(item?.productId, 1)}
                handleDecrement={() => updateCart(item?.productId, -1)}
              />
            ))}
          </div>
          <div className="border md:max-w-xs w-full h-max p-2 rounded-md bg-zinc-50">
            <div className="flex flex-col gap-4">
              <div className="font-semibold flex flex-col justify-end items-end w-full">
                <span className="font-medium text-zinc-500">Total </span>
                <span className="text-2xl text-zinc-700">
                  ₹{calculateCartValue}
                </span>
              </div>

              <div className="w-full border-t"></div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-700">Subtotal </span>
                  <span className="">₹{calculateCartValue}</span>
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

              <button
                onClick={handleOrder}
                disabled={!user && loading}
                className="bg-purple-500 h-11 text-white flex justify-center items-center px-4 py-2 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Spinner color="secondary" size="sm" />
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-40">
          <p className="text-zinc-500">No items in cart</p>
        </div>
      )}
    </div>
  );
}
