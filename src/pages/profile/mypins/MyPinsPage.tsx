import { Box, List, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyPins } from "../actions";
import { ConfirmDeletePinDialog } from "../../map/pins/components/ConfirmDeletePinDialog";
import { useMyPinsFilters } from "../../../hooks/useMyPinsFilters";
import { MyPinsFilters } from "./components/MyPinsFilters";
import { Loader } from "../../../components/Loader";
import { MyPinsEmptyState } from "./components/MyPinsEmptyState";
import { PinItem } from "./components/PinItem";

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

  const {
    data: myPins,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["myPins", typeFilter, statusFilter, sortOrder],
    queryFn: () =>
      getMyPins({
        ...(typeFilter !== "all" ? { type: typeFilter } : {}),
        ...(statusFilter !== "all" ? { status: statusFilter } : {}),
        ...(sortOrder ? { sort: sortOrder } : {}),
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
      {error && (
        <MyPinsEmptyState
          error={error}
          isFetching={isFetching}
          pinsLength={myPins?.length || 0}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
        />
      )}
      {!myPins?.length && !isFetching && !error && (
        <MyPinsEmptyState
          error={error}
          isFetching={isFetching}
          pinsLength={myPins?.length || 0}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
        />
      )}

      {!isFetching && !error && (
        <List>
          {myPins?.map((pin, index) => (
            <PinItem
              key={pin.id}
              isLast={index === myPins.length - 1}
              pin={pin}
              setDeletedPinId={setDeletedPinId}
            />
          ))}
        </List>
      )}
      {deletedPinId && <ConfirmDeletePinDialog id={deletedPinId} />}
    </Box>
  );
};
