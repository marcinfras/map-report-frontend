import {
  Box,
  Card,
  CardContent,
  Container,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";

import { Outlet } from "react-router";
import { AuthHeader } from "./components/AuthHeader";
import { AuthTabs } from "./components/AuthTabs";
import { AuthFooter } from "./components/AuthFooter";
import { AuthGoogleLogin } from "./components/AuthGoogleLogin";

const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[6],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const theme = createTheme({
  shape: {
    borderRadius: 12,
  },
});

export const AuthLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContainer>
        <Container maxWidth="sm">
          <AuthHeader />
          <StyledCard>
            <StyledCardContent>
              <AuthTabs />
              <Outlet />
              <AuthGoogleLogin />
            </StyledCardContent>
          </StyledCard>
          <AuthFooter />
        </Container>
      </AuthContainer>
    </ThemeProvider>
  );
};
