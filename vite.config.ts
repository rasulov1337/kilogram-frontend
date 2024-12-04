import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {DEST_ROOT} from './src/target_config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: DEST_ROOT,
    server: {
        host: "0.0.0.0",
    },
});
