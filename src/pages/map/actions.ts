import { PinType, type Pin, type PinDetails } from "../../store/pinsStore";

export const createPin = async (data: FormData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/pins`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to create pin");
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getPins = async (type?: PinType) => {
  try {
    const params = type && type !== PinType.All ? `?type=${type}` : "";

    const res = await fetch(`${import.meta.env.VITE_API_URL}/pins${params}`);
    if (!res.ok) {
      throw new Error("Failed to fetch pins");
    }

    const resData: Pin[] = await res.json();

    return resData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getPinById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Pin ID is required");
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/pins/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch pin");
    }

    const resData: PinDetails = await res.json();

    return resData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getPinCounts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/pins/stats`);
    if (!res.ok) {
      throw new Error("Failed to fetch pin counts");
    }
    const resData: Record<PinType, number> = await res.json();

    return resData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
