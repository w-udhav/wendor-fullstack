import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import { useAuth } from "@/context/AuthContext";

const links = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "Cart", to: "/cart" },
  { name: "History", to: "/history" },
  { name: "My Orders", to: "/myorders", authOnly: true },
];

export default function Navbar() {
  const { user } = useAuth();

  const visibleLinks = links.filter((l) => !l.authOnly || user);

  return (
    <div className="w-full h-12 bg-white border-b sticky top-0 z-10">
      <Layout>
        <div className="w-full h-full flex justify-center sm:justify-end items-center">
          <div className="text-sm text-purple-600 font-medium">
            {visibleLinks.map((link) => (
              <Link key={link.name} to={link.to} className="pr-4">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
