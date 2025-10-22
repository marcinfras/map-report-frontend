import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import { Loader } from "@components/Loader";
import { PinsEmptyState } from "../components/Pins/PinsEmptyState";
import { PinsList } from "../components/Pins/PinsList";
import { ConfirmDeletePinDialog } from "../../map/pins/components/ConfirmDeletePinDialog";
import { AdminPinsFilters } from "./components/AdminPinsFilters";
import { useAdminPinsFilters } from "@hooks/useAdminPinsFilters";
import { getAdminPins } from "./actions";
import { usePagination } from "@hooks/usePagination";
import { PINS_PER_PAGE } from "@helpers/helpers";

export const AdminPage = () => {
  const [deletedPinId, setDeletedPinId] = useState<string | null>(null);

  const {
    typeFilter,
    statusFilter,
    sortOrder,
    searchValue,
    searchField,
    searchOperator,
    applyFilters,
  } = useAdminPinsFilters();

  const { page, setPage, resetToFirstPage } = usePagination();

  const {
    data: { pins, pagination: { totalPages } } = {
      pins: [],
      pagination: { totalPages: 0 },
    },
    isFetching,
    error,
  } = useQuery({
    queryKey: [
      "adminPins",
      typeFilter,
      statusFilter,
      sortOrder,
      searchValue,
      searchField,
      searchOperator,
      page,
      PINS_PER_PAGE,
    ],
    queryFn: () =>
      getAdminPins({
        ...(typeFilter !== "all" ? { type: typeFilter } : {}),
        ...(statusFilter !== "all" ? { status: statusFilter } : {}),
        ...(sortOrder ? { sort: sortOrder } : {}),
        ...(searchValue
          ? {
              search: searchValue,
              field: searchField,
              operator: searchOperator,
            }
          : {}),
        page,
        limit: PINS_PER_PAGE,
      }),
  });

  return (
    <Box p={3} maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Manage pins
      </Typography>

      <AdminPinsFilters
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        searchValue={searchValue}
        searchField={searchField}
        searchOperator={searchOperator}
        onApply={applyFilters}
        disabled={isFetching}
      />

      {isFetching && <Loader />}

      {error || (!pins?.length && !isFetching && !error) ? (
        <PinsEmptyState
          error={error}
          isFetching={isFetching}
          pinsLength={pins?.length || 0}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          searchValue={searchValue}
        />
      ) : null}

      {!isFetching && !error && pins && (
        <PinsList
          pins={pins}
          setDeletedPinId={setDeletedPinId}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
      {deletedPinId && (
        <ConfirmDeletePinDialog
          id={deletedPinId}
          resetToFirstPage={resetToFirstPage}
        />
      )}
    </Box>
  );
};
