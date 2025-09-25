import { Security } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import { useLocation } from "react-router";
import { fontSize_32 } from "../../../helpers/sizes";

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  boxShadow: theme.shadows[3],
}));

const Icon = styled(Security)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: fontSize_32,
}));

export const AuthHeader = () => {
  const { pathname } = useLocation();

  return (
    <Box textAlign="center" mb={4}>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Typography
        variant="h3"
        component="h1"
        color="white"
        fontWeight="bold"
        gutterBottom
      >
        {pathname === "/login" ? "Welcome Back" : "Create Account"}
      </Typography>
      <Typography color="rgba(255,255,255,0.8)">
        {pathname === "/login" ? "Sign in to your account" : "Join us today"}
      </Typography>
    </Box>
  );
};
