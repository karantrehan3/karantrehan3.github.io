import path from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import tsconfigPaths from "vite-tsconfig-paths";

import { analyticsPlugin } from "./vite/plugins/analytics.mjs";
import { metaTagsPlugin } from "./vite/plugins/meta-tags.mjs";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    metaTagsPlugin(),
    analyticsPlugin(),
    visualizer(),
    mode === "analyze" && analyzer(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
    },
    dedupe: ["react", "react-dom"],
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.mjs",
  },
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 512,
    minify: "esbuild",
    sourcemap: mode !== "production",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    emptyOutDir: true,
    reportCompressedSize: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          "react-vendor": ["react", "react-dom"],
          "mantine-vendor": ["@mantine/core", "@mantine/hooks"],
          "router-vendor": ["react-router-dom"],
          // Keep tabler icons separate since they're large
          "tabler-icons": ["@tabler/icons-react"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
      treeshake: {
        // CSS imports are handled separately by Vite, so this is safe
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@mantine/core", "@mantine/hooks"],
  },
}));
