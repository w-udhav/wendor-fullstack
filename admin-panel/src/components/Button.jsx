import React from "react";

export default function Button({
  children,
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
      {children}
    </button>
  );
}
