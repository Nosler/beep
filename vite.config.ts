/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [
        solid(),
        { ...eslint(), apply: 'build' },
        {
            ...eslint({ failOnWarning: false, failOnError: false }),
            apply: 'serve',
            enforce: 'post',
        },
    ],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 1420,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ['**/src-tauri/**'],
        },
    },
    resolve: {
        alias: {
            'simple-peer': 'simple-peer/simplepeer.min.js',
        },
    },
}));
