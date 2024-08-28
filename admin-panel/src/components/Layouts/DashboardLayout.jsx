import React, { useEffect, useState } from "react";
import { navLinks } from "@/utils/constants";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <div className="w-screen h-screen bg-color overflow-hidden">
      {/* Container */}
      <div className="w-full h-full flex">
        {/* Side panel */}
        <div className="max-w-xs w-full h-full p-4 border-r border-zinc-800 flex flex-col gap-3">
          {/* Top */}
          <div className="flex gap-3 items-center pb-4 border-b border-zinc-800">
            <div className="text-white bg-gray rounded-xl px-3 py-2 text-sm">
              Logo
            </div>
            <div className="text-white bg-gray rounded-xl px-3 py-2 text-sm font-semibold">
              Admin
            </div>
          </div>
          {/* Lower */}
          <div className="flex flex-col gap-4">
            <h1 className="text-sm font-bold">Navigations</h1>
            <div className="flex flex-col">
              {navLinks.map((link, index) => {
                const isCurrentMatch =
                  currentPath.split("/")[1] === link.href.split("/")[1];
                return (
                  <Link
                    to={link.href}
                    key={index}
                    onClick={() => setCurrentPath(link.href)}
                    className={`w-full px-3 py-2 text-sm font-medium ${
                      isCurrentMatch ? "bg-gray rounded-xl" : "text-zinc-400"
                    }  `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
