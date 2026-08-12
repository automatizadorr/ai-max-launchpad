import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  // Bundle SSR autocontenido (usado solo en build-time por prerender.mjs):
  // evita problemas de resolución ESM/CJS al importar el entry desde Node.
  ssr: {
    noExternal: true,
  },
  build: {
    rollupOptions: {
      // manualChunks solo aplica al build de cliente; en SSR rompería el entry único.
      output: isSsrBuild
        ? {}
        : {
            // Separa librerías grandes en chunks cacheables (mejor caché entre visitas).
            manualChunks: {
              "react-vendor": ["react", "react-dom", "react-router-dom"],
              motion: ["framer-motion"],
              particles: ["@tsparticles/react", "@tsparticles/slim"],
              supabase: ["@supabase/supabase-js"],
            },
          },
    },
  },
}));
