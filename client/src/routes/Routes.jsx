import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "@/pages/Home";
import MyOrders from "@/pages/MyOrders";
import Products from "@/pages/Products";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout/Layout";

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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
