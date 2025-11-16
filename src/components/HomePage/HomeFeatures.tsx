import { Security, Speed, ReportProblem } from "@mui/icons-material";
import { FeaturesSection, type FeatureItem } from "@components/FeaturesSection";
import { Box } from "@mui/material";

const features: FeatureItem[] = [
  {
    icon: ReportProblem,
    title: "Report Issues",
    description:
      "Easily mark issues such as potholes, broken lights, or graffiti directly on the map.",
  },
  {
    icon: Speed,
    title: "Track Progress",
    description:
      "See when reports are updated or resolved with real-time status tracking.",
  },
  {
    icon: Security,
    title: "Safe & Simple Login",
    description:
      "Log in securely using your account or Google to manage your reports easily.",
  },
];

export const HomeFeatures = () => {
  return (
    <Box sx={{ px: 3 }}>
      <FeaturesSection
        features={features}
        title="Why use MapReport?"
        sx={{ py: 10 }}
      />
    </Box>
  );
};
