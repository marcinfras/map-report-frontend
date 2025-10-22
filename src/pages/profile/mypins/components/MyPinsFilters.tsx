import { PinStatusFilter, PinsSortOrder } from "@hooks/useMyPinsFilters";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { PinStatus, PinType } from "@store/pinsStore";

interface MyPinsFiltersProps {
  typeFilter: PinType;
  statusFilter: PinStatusFilter;
  sortOrder: PinsSortOrder;
  handleTypeChange: (val: PinType) => void;
  handleStatusChange: (val: PinStatusFilter) => void;
  handleSortChange: (val: PinsSortOrder) => void;
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
          onChange={(e: SelectChangeEvent<PinStatusFilter>) =>
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
          <MenuItem value={PinsSortOrder.Desc}>Newest</MenuItem>
          <MenuItem value={PinsSortOrder.Asc}>Oldest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
