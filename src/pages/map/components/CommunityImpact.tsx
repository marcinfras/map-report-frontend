import { Typography, Box, Card } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { usePinCounts } from "../../../hooks/usePinCounts";
import { fontWeight_600 } from "../../../helpers/sizes";

export const CommunityImpact = () => {
  const { counts } = usePinCounts();

  return (
    <Box sx={{ flex: 1 }}>
      <Card sx={{ p: 3, borderRadius: 2, border: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <InfoIcon sx={{ mr: 1, color: "secondary.main" }} />
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: fontWeight_600 }}
          >
            Community Impact
          </Typography>
        </Box>
        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          Track the collective efforts of your community in identifying and
          addressing local issues and opportunities.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            mt: 1,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "error.main" }}
            >
              {counts.damage}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Damages
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "warning.main" }}
            >
              {counts.change}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Changes
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "success.main" }}
            >
              {counts.idea}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Ideas
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
