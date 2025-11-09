import type { listMyPins } from "@marcinfras/map-report-server/types";
import type { PasswordFormData } from "./profileSchemas";
import type { PinsSortOrder } from "@hooks/useMyPinsFilters";

export const getMyPins = async ({
  type,
  status,
  sort,
  page,
  limit,
}: {
  type?: string;
  status?: string;
  sort?: PinsSortOrder;
  page?: number;
  limit?: number;
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

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/pins/my?${params.toString()}`,
      { credentials: "include" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch my pins");
    }

    const resData = await res.json();

    return resData as listMyPins;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: "PATCH",
      body: data,
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const changePassword = async (data: PasswordFormData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/change-password`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to change password");
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
