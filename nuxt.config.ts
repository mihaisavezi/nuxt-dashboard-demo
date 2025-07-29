import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-auth-utils",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
  debug: true
});
