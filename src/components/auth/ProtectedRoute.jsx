import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
