import L from "leaflet";
import { PinStatus, PinType } from "../store/pinsStore";
import type { ChipOwnProps, Theme } from "@mui/material";

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

export const isValidPinStatus = (value: string): value is PinStatus => {
  return Object.values(PinStatus).includes(value as PinStatus);
};

export const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB").format(new Date(value));
};

export const getStatusConfig = (
  status: PinStatus
): {
  label: string;
  color: ChipOwnProps["color"];
  variant: ChipOwnProps["variant"];
} => {
  return {
    label: status === PinStatus.Active ? "Active" : "Resolved",
    color: status === PinStatus.Active ? "success" : "default",
    variant: status === PinStatus.Active ? "filled" : "outlined",
  };
};
