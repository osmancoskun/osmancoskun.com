import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $g_images: "/src/lib/images/gnome/index.js",
    },
  },
});
