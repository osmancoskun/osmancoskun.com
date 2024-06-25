import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $g_comps: "/src/lib/components/index.js",
      $g_images: "/src/lib/images/gnome/index.js",
      $g_apps: "/src/lib/apps/index.js",
    },
  },
});
