import { Typography, Box, Card, alpha } from "@mui/material";
import { fontWeight_600 } from "../../../helpers/sizes";

export const Feature = ({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Box
          sx={(theme) => ({
            width: 48,
            height: 48,
            bgcolor: alpha(theme.palette[color].main, 0.1),
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          })}
        >
          <Icon sx={{ color: `${color}.main` }} />
        </Box>
        <Typography
          variant="h6"
          component="h4"
          sx={{ fontWeight: fontWeight_600, mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Card>
    </Box>
  );
};
