import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "@/pages/Home";
import MyOrders from "@/pages/MyOrders";
import Products from "@/pages/Products";
import Layout from "@/components/Layout/Layout";
import Cart from "@/pages/Cart";

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
