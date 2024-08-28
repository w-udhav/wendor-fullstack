import Button from "../Button";
import Input from "../Input";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-blue-500">
      <div className="max-w-[26rem] w-full rounded-3xl p-8 bg-black bg-opacity-10 backdrop-blur-xl flex flex-col items-center gap-5">
        <div>
          <h1 className="font-medium text-2xl">Welcome to Wendor</h1>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
