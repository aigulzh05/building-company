import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/building-company/dist",
  server: {
    port: 3000,
  },
});
