import { useSearchParams } from "react-router";
import { PinType } from "@store/pinsStore";
import { isValidPinStatus, isValidPinType } from "@helpers/helpers";
import { usePagination } from "./usePagination";
import { PinStatus } from "@marcinfras/map-report-server/types";

export enum PinsSortOrder {
  Asc = "asc",
  Desc = "desc",
}

export enum PinStatusFilter {
  All = "all",
  Active = PinStatus.Active,
  Resolved = PinStatus.Resolved,
}

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
  const statusFilter: PinStatusFilter =
    rawStatus && isValidPinStatus(rawStatus) ? rawStatus : PinStatusFilter.All;

  const rawSort = searchParams.get("sort");
  const sortOrder: PinsSortOrder =
    rawSort === PinsSortOrder.Asc ? PinsSortOrder.Asc : PinsSortOrder.Desc;

  const handleStatusChange = (value: PinStatusFilter) => {
    const params = resetToFirstPage(
      new URLSearchParams(searchParams.toString())
    );
    params.set("status", value);
    setSearchParams(params);
  };

  const handleSortChange = (value: PinsSortOrder) => {
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
