import { Typography, Box } from "@mui/material";
import {
  Place as PlaceIcon,
  PhotoCamera as PhotoCameraIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { Feature } from "./Feature";

type FeatureType = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}[];

const features: FeatureType = [
  {
    icon: PlaceIcon,
    title: "Location-Based Reporting",
    description:
      "Pinpoint exact locations of issues or ideas with our interactive mapping system for precise community engagement.",
    color: "primary",
  },
  {
    icon: PhotoCameraIcon,
    title: "Photo Documentation",
    description:
      "Upload images to provide visual context and help community members better understand reported issues.",
    color: "secondary",
  },
  {
    icon: GroupIcon,
    title: "Community Engagement",
    description:
      "Foster collaboration and civic participation through shared reporting and transparent community feedback.",
    color: "success",
  },
];

export const PlatformFeatures = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component="h3"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Platform Features
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </Box>
    </Box>
  );
};
