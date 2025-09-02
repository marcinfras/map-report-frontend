import { Box, Tab, Tabs, styled } from "@mui/material";
import { NavLink, useLocation } from "react-router";

const TabsWrapper = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(3),
}));

export const AuthTabs = () => {
  const { pathname } = useLocation();

  return (
    <TabsWrapper>
      <Tabs value={pathname} variant="fullWidth">
        <Tab label="Sign In" value="/login" component={NavLink} to="/login" />
        <Tab
          label="Sign Up"
          value="/register"
          component={NavLink}
          to="/register"
        />
      </Tabs>
    </TabsWrapper>
  );
};
