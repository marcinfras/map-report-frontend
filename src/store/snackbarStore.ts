import { create } from "zustand";

type SnackbarType = "success" | "error" | "info" | "warning";

type SnackbarState = {
  open: boolean;
  title: string;
  message: string;
  type: SnackbarType;
  show: (title: string, message: string, type: SnackbarType) => void;
  hide: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  title: "",
  message: "",
  type: "info",
  show: (title, message, type) => set({ open: true, title, message, type }),
  hide: () => set({ open: false }),
}));
