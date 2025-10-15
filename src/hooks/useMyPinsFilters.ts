import { useSearchParams } from "react-router";
import { PinStatus, PinType } from "../store/pinsStore";
import { isValidPinStatus, isValidPinType } from "../helpers/helpers";
import { usePagination } from "./usePagination";

export const useMyPinsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { resetToFirstPage } = usePagination();

  const rawType = searchParams.get("type");
  const typeFilter: PinType =
    rawType && isValidPinType(rawType) ? rawType : PinType.All;

  const handleTypeChange = (value: PinType) => {
    const params = resetToFirstPage(
      new URLSearchParams(searchParams.toString())
    );
    params.set("type", value);
    setSearchParams(params);
  };

  const rawStatus = searchParams.get("status");
  const statusFilter: PinStatus | "all" =
    rawStatus && isValidPinStatus(rawStatus) ? rawStatus : "all";

  const rawSort = searchParams.get("sort");
  const sortOrder: "asc" | "desc" = rawSort === "asc" ? "asc" : "desc";

  const handleStatusChange = (value: PinStatus | "all") => {
    const params = resetToFirstPage(
      new URLSearchParams(searchParams.toString())
    );
    params.set("status", value);
    setSearchParams(params);
  };

  const handleSortChange = (value: "asc" | "desc") => {
    const params = resetToFirstPage(
      new URLSearchParams(searchParams.toString())
    );
    params.set("sort", value);
    setSearchParams(params);
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
