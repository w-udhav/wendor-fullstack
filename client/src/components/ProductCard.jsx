import { useCart } from "@/context/CartContext";
import { defaultProductImage } from "@/utils/constants";
import React from "react";
import Icon from "./Icon";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({ data }) {
  const { cart, addToCart, updateCart } = useCart();
  const { user } = useAuth();

  const cartItem = cart.find((item) => item.productId === data.productId);

  const handleAddToCart = () => {
    addToCart(data);
  };

  const handleIncrement = () => {
    const totalQuantity = data?.quantity;
    if (cartItem?.quantity === totalQuantity) {
      toast.error("Maximum quantity reached");
      return;
    }
    updateCart(data.productId, 1);
  };

  const handleDecrement = () => {
    updateCart(data.productId, -1);
  };

  return (
    <div className="w-full min-h-[15rem] md:min-h-[20rem] max-h-[25rem] rounded-md p-2 relative border bg-zinc-50">
      <div className="w-full h-full  flex flex-col justify-between gap-2">
        {/* Image container */}
        <div className="flex items-center justify-center bg-white">
          <div className="w-full h-full">
            <img
              src={data?.display_img || defaultProductImage}
              alt={data?.productName}
              className="w-full h-full object-cover rounded-md border"
            />
          </div>
        </div>

        {/* Product details */}
        <div>
          <p className="text-xs text-zinc-500">{data?.productCategory}</p>
          <p className="text-zinc-700 font-medium">
            {data?.productName || "Name"}
          </p>
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 pt-2">
            <h2 className="text-xl font-medium  rounded-md flex-1">
              ₹ {data?.productPrice || "0.00"}{" "}
            </h2>
            {user &&
              (cartItem ? (
                <div className="flex items-center gap-4 md:w-1/2">
                  <button
                    onClick={handleDecrement}
                    className="bg-black rounded-md p-2 flex items-center justify-center flex-1 md:w-8 h-8"
                  >
                    <Icon name="remove" className="text-white text-sm" />
                  </button>
                  <div className="flex-1 font-semibold text-center md:w-10">
                    {cartItem?.quantity}
                  </div>
                  <button
                    onClick={handleIncrement}
                    className="bg-black rounded-md p-2 flex items-center justify-center flex-1 w-8 h-8"
                  >
                    <Icon name="add" className="text-white text-xl" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-2 py-1 rounded-[3px] text-sm"
                >
                  <span>Add</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
