import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyPins } from "../actions";
import { ConfirmDeletePinDialog } from "../../map/pins/components/ConfirmDeletePinDialog";
import { useMyPinsFilters } from "@hooks/useMyPinsFilters";
import { MyPinsFilters } from "./components/MyPinsFilters";
import { Loader } from "@components/Loader";
import { PinsEmptyState } from "../components/Pins/PinsEmptyState";
import { PinsList } from "../components/Pins/PinsList";
import { usePagination } from "@hooks/usePagination";
import { PINS_PER_PAGE } from "@helpers/helpers";

export const MyPinsPage = () => {
  const [deletedPinId, setDeletedPinId] = useState<string | null>(null);

  const {
    typeFilter,
    statusFilter,
    sortOrder,
    handleTypeChange,
    handleStatusChange,
    handleSortChange,
  } = useMyPinsFilters();

  const { page, setPage, resetToFirstPage } = usePagination();

  const {
    data: { pins: myPins, pagination: { totalPages } } = {
      pins: [],
      pagination: { totalPages: 0 },
    },
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["myPins", typeFilter, statusFilter, sortOrder, page],
    queryFn: () =>
      getMyPins({
        ...(typeFilter !== "all" ? { type: typeFilter } : {}),
        ...(statusFilter !== "all" ? { status: statusFilter } : {}),
        ...(sortOrder ? { sort: sortOrder } : {}),
        page,
        limit: PINS_PER_PAGE,
      }),
  });

  return (
    <Box p={3} maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={2}>
        My Pins
      </Typography>
      <MyPinsFilters
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        handleTypeChange={handleTypeChange}
        handleStatusChange={handleStatusChange}
        handleSortChange={handleSortChange}
        disabled={
          isFetching ||
          isError ||
          (!myPins?.length &&
            !isFetching &&
            typeFilter === "all" &&
            statusFilter === "all")
        }
      />
      {isFetching && <Loader />}

      {error || (!myPins?.length && !isFetching && !error) ? (
        <PinsEmptyState
          error={error}
          isFetching={isFetching}
          pinsLength={myPins?.length || 0}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
        />
      ) : null}

      {!isFetching && !error && myPins && (
        <PinsList
          pins={myPins}
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
