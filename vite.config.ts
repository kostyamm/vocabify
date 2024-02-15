import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    preview: {
        port: 4040,
        open: true,
        strictPort: true,
    },
    plugins: [
        react(),
        splitVendorChunkPlugin(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes('node_modules')) {
                        const [_, dependencyPath] = id.split('node_modules/');

                        return dependencyPath.split('/')[0];
                    }
                },
            },
        },
    },
});