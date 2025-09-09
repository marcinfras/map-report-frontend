import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
