import { Box, Paper, Typography } from "@mui/material";
import type { FeatureColor } from "./FeaturesSection";

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color = "primary",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: FeatureColor;
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: 4,
        maxWidth: 320,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Icon sx={{ color: `${color}.main`, fontSize: 50 }} />
      </Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};
