import { create } from "zustand";

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
  type: PinType.Damage | PinType.Change | PinType.Idea;
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
  newPinCoords: { lat: number; lng: number } | null;
  setNewPinCoords: (coords: { lat: number; lng: number } | null) => void;
};

export const usePinsStore = create<PinsState>((set) => ({
  addPinModalOpen: false,
  setIsAddPinModalOpen: (open) => set({ addPinModalOpen: open }),
  pinDetailsModalOpen: false,
  setIsPinDetailsModalOpen: (open) => set({ pinDetailsModalOpen: open }),
  newPinCoords: null,
  setNewPinCoords: (coords) => set({ newPinCoords: coords }),
}));
