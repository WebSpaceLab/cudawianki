// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: [
        '@unocss/nuxt',
        'nuxt-icon',
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@vueuse/nuxt',
        '@nuxt/devtools',
        // '@nuxt/content', 
        '@nuxt/image-edge',
    ],

    app: {
        head: {
            title: 'Cuda wianki',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },

    // extends: [
    //     'nuxt-seo-kit'
    // ],

    plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],

    css: [
        '~/assets/css/main.scss'
    ],
    
    // runtimeConfig: {
    //     jwtAccessSecret:  process.env.JWT_ACCESS_TOKEN_SECRET,
    //     jwtRefreshSecret:  process.env.JWT_REFRESH_TOKEN_SECRET,
    // },

    colorMode: {
        classSuffix: ''
    },

    // content: {},

    imports: {
        dirs: [
          // Scan top-level modules
          'composables',
          // ... or scan modules nested one level deep with a specific name and file extension
          'composables/*/index.{ts,js,mjs,mts}',
          // ... or scan all modules within given directory
          'composables/**'
        ]
    }
})
