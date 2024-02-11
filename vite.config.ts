import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    plugins: [
        react(),
        chunkSplitPlugin({
            strategy: 'unbundle',
            customChunk: (args)=>{
                // files into pages directory is export in single files
                let { file }: any = args;

                if(file.startsWith('src/pages/')){
                    file = file.substring(4);
                    file = file.replace(/\.[^.$]+$/, '');
                    return file;
                }
                return null;
            },
        })
    ],
    // build: {
    //     rollupOptions: {
    //         output: {
    //             manualChunks(id) {
    //                 if (id.includes('node_modules')) {
    //                     return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //                 }
    //             },
    //         },
    //     },
    // },
});
