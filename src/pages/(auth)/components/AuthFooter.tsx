import { Link, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router";

export const AuthFooter = () => {
  const { pathname } = useLocation();

  return (
    <Typography
      variant="body2"
      color="rgba(255,255,255,0.8)"
      textAlign="center"
      mt={3}
    >
      {pathname === "/login"
        ? "Don't have an account? "
        : "Already have an account? "}
      <Link
        component={NavLink}
        to={`/${pathname === "/login" ? "register" : "login"}`}
        color="inherit"
        sx={{ textDecoration: "underline", fontWeight: "bold" }}
      >
        {pathname === "/login" ? "Sign up" : "Sign in"}
      </Link>
    </Typography>
  );
};
