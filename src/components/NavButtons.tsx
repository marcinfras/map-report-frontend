import { Box, Button } from "@mui/material";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Map as MapIcon, Login as LoginIcon } from "@mui/icons-material";
import { NavAuthMenu } from "./NavAuthMenu";

export const NavButtons = () => {
  const { isAuthenticated, user, logout, isLoggingOut } = useAuth();

  return (
    <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<MapIcon />}
        sx={{ textTransform: "none" }}
      >
        Map
      </Button>

      {isAuthenticated && user ? (
        <NavAuthMenu user={user} logout={logout} isLoggingOut={isLoggingOut} />
      ) : (
        <Button
          component={Link}
          to="/login"
          startIcon={<LoginIcon />}
          sx={{ textTransform: "none" }}
        >
          Login
        </Button>
      )}
    </Box>
  );
};
