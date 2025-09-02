import { Box, Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router";

export const NavButtons = () => {
  return (
    <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<MapIcon />}
        sx={{
          textTransform: "none",
        }}
      >
        Map
      </Button>
      <Button
        component={Link}
        to="/login"
        startIcon={<LoginIcon />}
        sx={{ textTransform: "none" }}
      >
        Login
      </Button>
    </Box>
  );
};
