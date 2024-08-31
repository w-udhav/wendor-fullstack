import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import { useAuth } from "@/context/AuthContext";

const links = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Products",
    to: "/products",
  },
  {
    name: "My Orders",
    to: "/myorders",
  },
  {
    name: "Cart",
    to: "/cart",
  },
];
export default function Navbar() {
  const [newLinks, setNewLinks] = React.useState([]);
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      setNewLinks(links);
    } else {
      setNewLinks(links.slice(0, 2));
    }
  }, [user]);

  return (
    <div className="w-full h-12 bg-white border-b sticky top-0 z-10">
      <Layout>
        <div className="w-full h-full flex justify-center sm:justify-end items-center">
          <div className="text-sm text-purple-600 font-medium">
            {newLinks.map((link) => (
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
