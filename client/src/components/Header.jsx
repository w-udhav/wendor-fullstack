import React from "react";
import Icon from "./Icon";
import LoginModal from "./Modals/LoginModal";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const links = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Products",
    to: "/products",
  },
  {
    name: "My Orders",
    to: "/myorders",
  },
  {
    name: "Cart",
    to: "/cart",
  },
];
export default function Header({ heading, subheading }) {
  const { cart } = useCart();
  const uniqueItems = cart.reduce((acc, item) => {
    if (!acc.includes(item.productId)) {
      acc.push(item.productId);
    }
    return acc;
  }, []);
  return (
    <div className="pt-20 w-full flex justify-between gap-2 items-start">
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-5xl font-extrabold">{heading}</h1>
        <div className="text-sm text-purple-600 font-medium">
          {links.map((link) => (
            <Link key={link.name} to={link.to} className="pr-4">
              {link.name}
            </Link>
          ))}
        </div>
        <p className="text-md text-gray-500 max-w-xl">{subheading}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Link to="/cart" className="pt-2">
            <Icon name="shopping_cart" />
          </Link>
          {uniqueItems.length > 0 && (
            <div className="absolute top-0 -left-5 bg-black text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
              {uniqueItems.length}
            </div>
          )}
        </div>
        <LoginModal />
      </div>
    </div>
  );
}
