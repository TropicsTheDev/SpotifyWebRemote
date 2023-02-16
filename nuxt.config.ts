// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth", "@pinia/nuxt"],
  runtimeConfig: {
    authOrigin: "",
    jwtSecret: "",
    public: {
      clientId: "",
      clientSecret: "",
    },
  },
  tailwindcss: {
    config: {
      plugins: [tailwindScrollbarHide],
    },
  },
});
