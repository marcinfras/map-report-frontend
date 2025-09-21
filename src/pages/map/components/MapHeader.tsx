import { Box, Typography } from "@mui/material";

export const MapHeader = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ textAlign: "center", maxWidth: 768, mx: "auto" }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Report Issues, Suggest Changes, Share Ideas
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
          Help improve your community by reporting damages, suggesting changes,
          or sharing innovative ideas. Click anywhere on the map to get started.
        </Typography>
      </Box>
    </Box>
  );
};
