import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import { useAuth } from "@/store/useAuth";

export default function ProtectedRoute() {
  const { user } = useAuth();
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace={true} />;
  // }
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
