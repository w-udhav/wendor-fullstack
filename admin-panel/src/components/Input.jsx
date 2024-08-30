import React from "react";

const Input = ({ id, type, name, className, onChange, value, placeholder }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="bg-black bg-opacity-5 backdrop-blur-xl rounded-xl p-4 py-3 outline-none focus:outline-primary w-full"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
