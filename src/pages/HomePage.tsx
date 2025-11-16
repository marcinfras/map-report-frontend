import { Box } from "@mui/material";
import { HomeHeader } from "@components/HomePage/HomeHeader";
import { HomeFeatures } from "@components/HomePage/HomeFeatures";

export const HomePage = () => {
  return (
    <Box>
      <HomeHeader />
      <HomeFeatures />
    </Box>
  );
};
