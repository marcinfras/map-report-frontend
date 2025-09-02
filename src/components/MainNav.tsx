import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { NavButtons } from "./NavButtons";
import MapIcon from "@mui/icons-material/Map";

export const MainNav = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={1}
      sx={{
        backgroundColor: "white",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <MapIcon
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "12px",
              fontSize: { sx: 30, sm: 32 },
              p: 0.5,
            }}
          />
          <Typography variant="h6" fontSize={{ xs: 18, sm: 20 }}>
            MapReport
          </Typography>
        </Box>
        <NavButtons />
      </Toolbar>
    </AppBar>
  );
};
