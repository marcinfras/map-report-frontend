import { Box, Chip } from "@mui/material";
import {
  SelectAll,
  ReportProblem,
  Build,
  Lightbulb,
} from "@mui/icons-material";
import { PinType } from "../../../store/pinsStore";
import { useSelectedPinType } from "../../../hooks/useSelectedPinType";
import { usePinCounts } from "../../../hooks/usePinCounts";

const filters = [
  {
    key: PinType.All,
    label: "All Types",
    icon: <SelectAll />,
    color: "#1976d2",
  },
  {
    key: PinType.Damage,
    label: "Damage",
    icon: <ReportProblem />,
    color: "#d32f2f",
  },
  {
    key: PinType.Change,
    label: "Change",
    icon: <Build />,
    color: "#f57c00",
  },
  {
    key: PinType.Idea,
    label: "Idea",
    icon: <Lightbulb />,
    color: "#388e3c",
  },
];
export const MapFilters = () => {
  const { selectedPinType, setSelectedPinType } = useSelectedPinType();

  const { counts } = usePinCounts();

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {filters.map((filter) => (
          <Chip
            key={filter.key}
            icon={filter.icon}
            label={`${filter.label} (${counts[filter.key]})`}
            onClick={() => setSelectedPinType(filter.key)}
            variant={selectedPinType === filter.key ? "filled" : "outlined"}
            sx={{
              backgroundColor:
                selectedPinType === filter.key ? filter.color : "transparent",
              borderColor: filter.color,
              color: selectedPinType === filter.key ? "white" : filter.color,
              "&:hover": {
                backgroundColor:
                  selectedPinType === filter.key
                    ? filter.color
                    : `${filter.color}20`,
                transform: "translateY(-2px)",
                boxShadow: 2,
              },
              transition: "all 0.2s ease",
              fontWeight: selectedPinType === filter.key ? "bold" : "normal",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
