import { Box, Stack, TextField, MenuItem, Button } from "@mui/material";
import { MyPinsFilters } from "../../mypins/components/MyPinsFilters";
import type { PinStatus, PinType } from "../../../../store/pinsStore";
import { useState } from "react";
import type {
  SearchField,
  SearchOperator,
} from "../../../../hooks/useAdminPinsFilters";

interface AdminPinsFiltersProps {
  typeFilter: PinType;
  statusFilter: PinStatus | "all";
  sortOrder: "asc" | "desc";
  searchValue: string;
  searchField: SearchField;
  searchOperator: SearchOperator;
  onApply: (filters: {
    type: PinType;
    status: PinStatus | "all";
    sort: "asc" | "desc";
    searchValue?: string;
    searchField?: SearchField;
    searchOperator?: SearchOperator;
  }) => void;
  disabled?: boolean;
}

export const AdminPinsFilters = ({
  typeFilter,
  statusFilter,
  sortOrder,
  searchValue,
  searchField,
  searchOperator,
  onApply,
  disabled,
}: AdminPinsFiltersProps) => {
  const [localType, setLocalType] = useState(typeFilter);
  const [localStatus, setLocalStatus] = useState(statusFilter);
  const [localSort, setLocalSort] = useState(sortOrder);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const [localSearchField, setLocalSearchField] = useState(searchField);
  const [localSearchOperator, setLocalSearchOperator] =
    useState(searchOperator);

  const handleSearchClick = () => {
    onApply({
      type: localType,
      status: localStatus,
      sort: localSort,
      searchValue: localSearchValue,
      searchField: localSearchField,
      searchOperator: localSearchOperator,
    });
  };

  return (
    <Box mb={3}>
      <MyPinsFilters
        typeFilter={localType}
        statusFilter={localStatus}
        sortOrder={localSort}
        handleTypeChange={setLocalType}
        handleStatusChange={setLocalStatus}
        handleSortChange={setLocalSort}
        disabled={disabled}
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
        <TextField
          select
          label="Search by"
          size="small"
          value={localSearchField}
          onChange={(e) => setLocalSearchField(e.target.value as SearchField)}
          sx={{ width: 140 }}
          disabled={disabled}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="description">Description</MenuItem>
          <MenuItem value="author">Author</MenuItem>
        </TextField>

        <TextField
          select
          label="Match"
          size="small"
          value={localSearchOperator}
          onChange={(e) =>
            setLocalSearchOperator(e.target.value as SearchOperator)
          }
          sx={{ width: 140 }}
          disabled={disabled}
        >
          <MenuItem value="contains">Contains</MenuItem>
          <MenuItem value="equals">Equals</MenuItem>
          <MenuItem value="startsWith">Starts with</MenuItem>
        </TextField>

        <TextField
          size="small"
          label="Search value"
          value={localSearchValue}
          onChange={(e) => setLocalSearchValue(e.target.value)}
          disabled={disabled}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          disabled={disabled}
          sx={{ height: 40, minWidth: 100 }}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};
