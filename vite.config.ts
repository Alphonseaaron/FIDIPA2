import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg'],
  build: {
    assetsInlineLimit: 0, // Disable inlining assets as base64
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original extension for jpg files
          if (assetInfo.name.endsWith('.jpg') || assetInfo.name.endsWith('.jpeg')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
});