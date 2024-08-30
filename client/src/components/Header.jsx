import React from "react";
import Icon from "./Icon";
import LoginModal from "./Modals/LoginModal";
import { Link } from "react-router-dom";

export default function Header({ heading, subheading }) {
  return (
    <div className="pt-20 w-full flex justify-between gap-2 items-start">
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-5xl font-extrabold">{heading}</h1>
        <div className="text-sm text-purple-600 font-medium">breadcrumbs</div>
        <p className="text-md text-gray-500 max-w-xl">{subheading}</p>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/cart" className="pt-2">
          <Icon name="shopping_cart" />
        </Link>
        <LoginModal />
      </div>
    </div>
  );
}
