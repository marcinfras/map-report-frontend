import type { MyPin } from "../../store/pinsStore";
import type { PasswordFormData } from "./profileSchemas";

export const getMyPins = async ({
  type,
  status,
  sort,
}: {
  type?: string;
  status?: string;
  sort?: "asc" | "desc";
}) => {
  try {
    const params = new URLSearchParams();
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

    return resData as MyPin[];
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
