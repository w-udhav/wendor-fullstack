import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";

export default function Layout({ children }) {
  return (
    <div className="w-full h-full flex justify-center text-black px-5 xl:px-0">
      <div className="max-w-screen-xl w-full">{children}</div>
    </div>
  );
}
