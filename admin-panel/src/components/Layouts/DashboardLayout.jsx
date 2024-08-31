import React, { useEffect, useState } from "react";
import { navLinks } from "@/utils/constants";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import Button from "../Button";
import Icon from "../Icon";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const { logout } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleLogout = () => {
    try {
      logout();
      toast.success("Logout successful");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-screen h-screen bg-color overflow-hidden">
      {/* Container */}
      <div className="w-full h-full flex">
        {/* Side panel */}
        <div className="max-w-xs w-full h-full p-4 border-r border-zinc-800 flex flex-col gap-3">
          {/* Top */}
          <div className="flex gap-3 items-center pb-4 border-b border-zinc-800">
            <a
              href="https://wendor.in/"
              target="_blank"
              className="text-white bg-gray rounded-xl px-3 py-2 text-sm"
            >
              <img src={logo} alt="logo" className="w-6" />
            </a>
            <h3 className="text-white bg-gray rounded-xl px-3 py-2 text-sm font-semibold">
              Admin
            </h3>
          </div>
          {/* Lower */}
          <div className="h-full flex flex-col justify-between">
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
            <div>
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-sm font-medium text-left bg-gray text-red-400 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Icon name="logout" className="text-xl" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
