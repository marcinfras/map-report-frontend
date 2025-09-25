import L from "leaflet";
import { PinType } from "../store/pinsStore";
import type { Theme } from "@mui/material";

export const createCustomIcon = (type: string, theme: Theme) => {
  const colors = {
    damage: theme.palette.error.main,
    change: theme.palette.warning.main,
    idea: theme.palette.success.main,
  };

  const color = colors[type as keyof typeof colors] || "#d32f2f";

  return L.divIcon({
    html: `<div style="width:24px; height:24px; background:${color}; border-radius:50%; border:2px solid white;"></div>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

export const isValidPinType = (value: string): value is PinType => {
  return Object.values(PinType).includes(value as PinType);
};

export const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB").format(new Date(value));
};
