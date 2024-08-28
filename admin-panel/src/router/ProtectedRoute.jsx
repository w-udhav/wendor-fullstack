import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/Layouts/DashboardLayout";

export default function ProtectedRoute() {
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace={true} />;
  // }
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
