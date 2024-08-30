import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  return user && user?.id !== "" && user?.role === "admin" ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
