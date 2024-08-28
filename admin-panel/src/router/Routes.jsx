import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthLayout from "@/components/Layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "@/pages/Dashboard/Products";
import Inventory from "@/pages/Dashboard/Inventory";

const AppRoutes = () => {
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
