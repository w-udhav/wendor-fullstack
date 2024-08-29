import React from "react";
import Loader from "./Loader";

export default function Button({
  children,
  isLoading,
  onClick,
  disabled = false,
  className,
}) {
  return (
    <button
      className={`p-3 w-full bg-primary disabled:bg-gray-100 disabled:bg-opacity-20 backdrop-blur-sm font-medium text-white transition-all rounded-xl shadow-md ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
