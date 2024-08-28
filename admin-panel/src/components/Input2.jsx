import React from "react";

export default function Input2({
  type,
  id,
  className,
  onChange,
  value,
  placeholder,
}) {
  return (
    <input
      type={type}
      className="bg-gray rounded-xl p-4 py-3 outline-none focus:outline-primary w-full"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
