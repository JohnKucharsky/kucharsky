import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig(({ command }) => {
    return {
        plugins: [
            react(),
            EnvironmentPlugin(["VITE_API_KEY"], {
                loadEnvFiles: command !== "build",
            }),
        ],
        server: {
            proxy: {
                "/api": {
                    target: "http://[::1]:1337",
                },
            },
        },
    };
});
