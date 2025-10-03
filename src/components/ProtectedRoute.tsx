import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import { Loader } from "./Loader";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/map" replace />;
  }

  return <Outlet />;
};
