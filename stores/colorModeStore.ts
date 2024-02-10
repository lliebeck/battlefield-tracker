import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ColorModeStore = {
  mode: "light" | "dark";
  setMode: (value: "light" | "dark") => void;
};

export const useColorMode = create<ColorModeStore>()(
  persist(
    (set) => ({
      mode: "light",
      setMode: (mode) => set(() => ({ mode })),
    }),
    {
      name: "color-mode-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
