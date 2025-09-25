import { Container, Box } from "@mui/material";
import { MapHeader } from "./components/MapHeader";
import { MapFilters } from "./components/MapFilters";
import { MyMap } from "./components/MyMap";
import { HowItWorks } from "./components/HowItWorks";
import { CommunityImpact } from "./components/CommunityImpact";
import { PlatformFeatures } from "./components/PlatformFeatures";
import { PinModal } from "./components/PinModal";
import { PinDetailsModal } from "./components/PinDetailsModal";

export const Map = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <MapHeader />
        <MapFilters />
        <MyMap />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: 4,
          }}
        >
          <HowItWorks />
          <CommunityImpact />
        </Box>
        <PlatformFeatures />
      </Container>
      <PinModal />
      <PinDetailsModal />
    </Box>
  );
};
