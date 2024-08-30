import React from "react";
import Navbar from "../Navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full h-full flex justify-center text-black">
      <div className="max-w-screen-xl w-full">{children}</div>
    </div>
  );
}
