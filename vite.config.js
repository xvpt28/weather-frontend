import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/data": {
  //       target: "https://api.openweathermap.org",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
