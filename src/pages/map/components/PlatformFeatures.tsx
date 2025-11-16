import {
  Place as PlaceIcon,
  PhotoCamera as PhotoCameraIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { FeaturesSection, type FeatureItem } from "@components/FeaturesSection";

const features: FeatureItem[] = [
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
    <FeaturesSection
      features={features}
      title="Platform Features"
      sx={{ mb: 4 }}
    />
  );
};
