import { Box, Chip } from "@mui/material";
import { getTypeConfig } from "../../../../helpers/getTypeConfig";
import { getStatusConfig } from "../../../../helpers/helpers";
import type { PinStatus, PinType } from "../../../../store/pinsStore";

export const PinItemChips = ({
  type,
  status,
}: {
  type: PinType.Damage | PinType.Change | PinType.Idea;
  status: PinStatus;
}) => {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      mb={0.5}
    >
      <Chip
        label={getTypeConfig(type).label}
        color={getTypeConfig(type).color as "error" | "warning" | "success"}
        icon={getTypeConfig(type).icon}
        size="small"
        sx={{ fontSize: "0.7rem", height: 20 }}
      />
      <Chip
        label={getStatusConfig(status).label}
        color={getStatusConfig(status).color}
        variant={getStatusConfig(status).variant}
        size="small"
        sx={{ fontSize: "0.7rem", height: 20 }}
      />
    </Box>
  );
};
