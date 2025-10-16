import { useSearchParams } from "react-router";
import { PinStatus, PinType } from "../store/pinsStore";
import { isValidPinStatus, isValidPinType } from "../helpers/helpers";

export const useMyPinsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawType = searchParams.get("type");
  const typeFilter: PinType =
    rawType && isValidPinType(rawType) ? rawType : PinType.All;

  const handleTypeChange = (value: PinType) => {
    searchParams.set("type", value);
    setSearchParams(searchParams);
  };

  const rawStatus = searchParams.get("status");
  const statusFilter: PinStatus | "all" =
    rawStatus && isValidPinStatus(rawStatus) ? rawStatus : "all";

  const rawSort = searchParams.get("sort");
  const sortOrder: "asc" | "desc" = rawSort === "asc" ? "asc" : "desc";

  const handleStatusChange = (value: PinStatus | "all") => {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  };

  const handleSortChange = (value: "asc" | "desc") => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return {
    typeFilter,
    statusFilter,
    sortOrder,
    handleTypeChange,
    handleStatusChange,
    handleSortChange,
  };
};
