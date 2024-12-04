import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/kilogram-frontend/",
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "/"),
            },
            "/images/": {
                target: "http://localhost:9000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/images/, "/images/"),
            },
        },
    },
});
