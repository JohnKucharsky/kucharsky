import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd()));
    return {
        base: process.env.VITE_API_KEY,
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: "http://[::1]:1337",
                },
            },
        },
    };
});
