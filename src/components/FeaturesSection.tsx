import { Box, Typography, type SxProps } from "@mui/material";
import { FeatureCard } from "./FeatureCard";
import type { Theme } from "@emotion/react";

export type FeatureItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: FeatureColor;
};

export type FeatureColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

type FeaturesSectionProps = {
  title: string;
  features: FeatureItem[];
  sx?: SxProps<Theme>;
};

export const FeaturesSection = ({
  title,
  features,
  sx,
}: FeaturesSectionProps) => {
  return (
    <Box sx={sx}>
      <Typography
        variant="h4"
        component="h3"
        sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
      </Box>
    </Box>
  );
};
