import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.jsx'), // Path to the index file that exports your components
      name: 'futurist-components', // Global variable name when used in UMD format
      formats: ['es', 'umd'],
      fileName: (format) => `futurist-components.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Mark React and ReactDOM as external dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/**']
    }
  }
});