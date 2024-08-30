import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user } = useAuth();
  return user && user?.id !== "" && user?.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
}
