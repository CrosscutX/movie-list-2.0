import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://movie-list-2-0-backend.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [react()],
});
