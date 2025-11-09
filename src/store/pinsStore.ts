import { create } from "zustand";
import { PinType as BackendPinType } from "@marcinfras/map-report-server/types";

export enum PinType {
  All = "all",
  Damage = BackendPinType.Damage,
  Change = BackendPinType.Change,
  Idea = BackendPinType.Idea,
}

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
