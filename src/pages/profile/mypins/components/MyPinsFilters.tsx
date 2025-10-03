import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { PinStatus, PinType } from "../../../../store/pinsStore";

interface MyPinsFiltersProps {
  typeFilter: PinType;
  statusFilter: PinStatus | "all";
  sortOrder: "asc" | "desc";
  handleTypeChange: (val: PinType) => void;
  handleStatusChange: (val: PinStatus | "all") => void;
  handleSortChange: (val: "asc" | "desc") => void;
  disabled?: boolean;
}

export const MyPinsFilters = ({
  typeFilter,
  statusFilter,
  sortOrder,
  handleTypeChange,
  handleStatusChange,
  handleSortChange,
  disabled,
}: MyPinsFiltersProps) => {
  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
      <FormControl size="small" sx={{ width: 120 }}>
        <InputLabel>Type</InputLabel>
        <Select
          disabled={disabled}
          value={typeFilter}
          onChange={(e: SelectChangeEvent<PinType>) =>
            handleTypeChange(e.target.value)
          }
          label="Type"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value={PinType.Damage}>Damage</MenuItem>
          <MenuItem value={PinType.Change}>Change</MenuItem>
          <MenuItem value={PinType.Idea}>Idea</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          disabled={disabled}
          value={statusFilter}
          onChange={(e: SelectChangeEvent<PinStatus | "all">) =>
            handleStatusChange(e.target.value)
          }
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value={PinStatus.Active}>Active</MenuItem>
          <MenuItem value={PinStatus.Resolved}>Resolved</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 120 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          disabled={disabled}
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          label="Sort"
        >
          <MenuItem value="desc">Newest</MenuItem>
          <MenuItem value="asc">Oldest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
