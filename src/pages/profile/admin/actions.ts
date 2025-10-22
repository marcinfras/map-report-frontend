import type { PinsSortOrder } from "@hooks/useMyPinsFilters";
import type { AdminPin } from "@store/pinsStore";

export const getAdminPins = async ({
  type,
  status,
  sort,
  search,
  field,
  operator,
  page,
  limit,
}: {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  sort?: PinsSortOrder;
  search?: string;
  field?: string;
  operator?: string;
}) => {
  try {
    const params = new URLSearchParams();

    if (page && page !== 1) {
      params.append("page", page.toString());
    }

    if (limit) {
      params.append("limit", limit.toString());
    }

    if (type && type !== "all") {
      params.append("type", type);
    }
    if (status && status !== "all") {
      params.append("status", status);
    }
    if (sort) {
      params.append("sort", sort);
    }
    if (search && field && operator) {
      params.append("search", search);
      params.append("field", field);
      params.append("operator", operator);
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/pins/admin?${params.toString()}`,
      { credentials: "include" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch admin pins");
    }

    const resData = await res.json();

    return resData as {
      pins: AdminPin[];
      pagination: { total: number; totalPages: number };
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
