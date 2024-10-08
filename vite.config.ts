import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/global.scss";`,
      },
    },
  },
  base: "/",
  // build: {
  //   outDir: "dist",
  // },
  // server: {
  //   port: 3000,
  // },
});
