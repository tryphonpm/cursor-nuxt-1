// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Mon CURSOR NUXT',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Description de mon site' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  nitro: {
    plugins: ['~/server/utils/dbConnect.ts'],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },
});
