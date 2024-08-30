import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  return user && user?.id !== "" && user?.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
