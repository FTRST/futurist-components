import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: false,
        environments: 'jsdom'
    }
})