import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
    plugins: [react(), EnvironmentPlugin(["VITE_API_KEY"])],
    server: {
        proxy: {
            "/api": {
                target: "http://[::1]:1337",
            },
        },
    },
});
