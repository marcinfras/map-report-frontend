import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
