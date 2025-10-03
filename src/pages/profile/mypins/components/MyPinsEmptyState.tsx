import { Box, Typography } from "@mui/material";
import type { PinStatus, PinType } from "../../../../store/pinsStore";

interface MyPinsEmptyStateProps {
  error?: Error | null;
  isFetching: boolean;
  pinsLength: number;
  typeFilter: PinType;
  statusFilter: PinStatus | "all";
}

export const MyPinsEmptyState = ({
  error,
  isFetching,
  pinsLength,
  typeFilter,
  statusFilter,
}: MyPinsEmptyStateProps) => {
  if (error)
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" fontWeight={600} gutterBottom color="error">
          Error loading pins
        </Typography>
        <Typography color="text.secondary">
          {error.message || "An unexpected error occurred."}
        </Typography>
      </Box>
    );

  if (!pinsLength && !isFetching && !error)
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {typeFilter === "all" && statusFilter === "all"
            ? "You haven't added any pins yet"
            : "No pins match the selected filters"}
        </Typography>
        <Typography color="text.secondary">
          {typeFilter === "all" && statusFilter === "all"
            ? "Pins you create will show up here for quick access."
            : "Try adjusting your filter criteria."}
        </Typography>
      </Box>
    );
};
