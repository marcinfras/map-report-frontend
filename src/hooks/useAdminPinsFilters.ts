import { useSearchParams } from "react-router";
import { PinType } from "@store/pinsStore";
import { isValidSearchField, isValidSearchOperator } from "@helpers/helpers";
import {
  PinStatusFilter,
  PinsSortOrder,
  useMyPinsFilters,
} from "./useMyPinsFilters";

export enum SearchOperator {
  Contains = "contains",
  Equals = "equals",
  StartsWith = "startsWith",
}

export enum SearchField {
  Title = "title",
  Description = "description",
  Author = "author",
}

export const useAdminPinsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { typeFilter, statusFilter, sortOrder } = useMyPinsFilters();

  const searchValue = searchParams.get("search") || "";

  const rawSearchField = searchParams.get("field");
  const searchField: SearchField =
    rawSearchField && isValidSearchField(rawSearchField)
      ? rawSearchField
      : SearchField.Title;

  const rawSearchOperator = searchParams.get("operator");
  const searchOperator: SearchOperator =
    rawSearchOperator && isValidSearchOperator(rawSearchOperator)
      ? rawSearchOperator
      : SearchOperator.Contains;

  const applyFilters = (filters: {
    type: PinType;
    status: PinStatusFilter;
    sort: PinsSortOrder;
    searchValue?: string;
    searchField?: SearchField;
    searchOperator?: SearchOperator;
  }) => {
    const params = new URLSearchParams();

    if (filters.type && filters.type !== "all")
      params.set("type", filters.type);
    if (filters.status && filters.status !== "all")
      params.set("status", filters.status);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.searchValue?.trim()) {
      params.set("search", filters.searchValue);
      params.set("field", filters.searchField || SearchField.Title);
      params.set("operator", filters.searchOperator || SearchOperator.Contains);
    }

    setSearchParams(params);
  };

  return {
    typeFilter,
    statusFilter,
    sortOrder,
    searchValue,
    searchField,
    searchOperator,
    applyFilters,
  };
};
