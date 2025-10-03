import type { MyPin } from "../../store/pinsStore";

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
