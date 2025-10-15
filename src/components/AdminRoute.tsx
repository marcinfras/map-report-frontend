import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "./Loader";
import type React from "react";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated || user?.profile.role !== "admin") {
    return <Navigate to="/map" replace />;
  }

  return <>{children}</>;
};
