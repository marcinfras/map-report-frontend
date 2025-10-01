import { create } from "zustand";
import type { PinFormType } from "../pages/map/pinSchemas";

export enum PinType {
  All = "all",
  Damage = "damage",
  Change = "change",
  Idea = "idea",
}

export type PinDetails = {
  id: string;
  title: string;
  description: string;
  type: PinFormType.Damage | PinFormType.Change | PinFormType.Idea;
  coordinates: {
    lat: number;
    lng: number;
  };
  image?: string;
  author: {
    _id: string;
    fullName: string;
  };
  status: "active" | "resolved";
  createdAt: string;
};

export type Pin = {
  id: string;
  type: PinType.Damage | PinType.Change | PinType.Idea;
  coordinates: {
    lat: number;
    lng: number;
  };
};

type PinsState = {
  addPinModalOpen: boolean;
  setIsAddPinModalOpen: (open: boolean) => void;
  pinDetailsModalOpen: boolean;
  setIsPinDetailsModalOpen: (open: boolean) => void;
  deletePinDialogOpen: boolean;
  setIsDeletePinDialogOpen: (open: boolean) => void;
  newPinCoords: { lat: number; lng: number } | null;
  setNewPinCoords: (coords: { lat: number; lng: number } | null) => void;
};

export const usePinsStore = create<PinsState>((set) => ({
  addPinModalOpen: false,
  setIsAddPinModalOpen: (open) => set({ addPinModalOpen: open }),
  pinDetailsModalOpen: false,
  setIsPinDetailsModalOpen: (open) => set({ pinDetailsModalOpen: open }),
  deletePinDialogOpen: false,
  setIsDeletePinDialogOpen: (open) => set({ deletePinDialogOpen: open }),
  newPinCoords: null,
  setNewPinCoords: (coords) => set({ newPinCoords: coords }),
}));
