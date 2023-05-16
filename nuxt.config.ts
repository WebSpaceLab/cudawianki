// https://nuxt.com/docs/api/configuration/nuxt-config
import { GlobalSettings } from './global'
// const appEnv = process.env.ENV || 'development'

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
        // '@nuxt/image-edge',
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
        '~/assets/css/main.scss',
        '~/assets/css/styles.css',
    ],
    
    runtimeConfig: {
    //     jwtAccessSecret:  process.env.JWT_ACCESS_TOKEN_SECRET,
    //     jwtRefreshSecret:  process.env.JWT_REFRESH_TOKEN_SECRET,
        // public: {
        //     siteEnv: GlobalSettings[appEnv].siteEnv,
        //     gtm_id: GlobalSettings[appEnv].googleTagManagerKey,
        //     gtm_enabled: GlobalSettings[appEnv].googleTagManagerEnabled,
        //     gtm_debug: GlobalSettings[appEnv].googleTagManagerDebug,
        //     cookieConsent: {
        //         controlButton: false,
        //         barPosition: 'bottom-left',
        //         necessary: [
        //             {
        //                 name: 'Website & API',
        //                 description: 'Essential for the website to work correctly',
        //                 cookies: [
        //                     'cookie_control_consent', 'cookie_control_enabled_cookies'
        //                 ]
        //             },
        //         ],

        //         optional: [
        //             {
        //                 name: 'Mafketing',
        //                 description: 'Used for google analytics',
        //                 cookies: ['ga', 'ga-<token>'],
        //             }
        //         ],

        //         colors: {
        //             checkboxActiveBackground: '#56ff28',
        //             checkboxInactiveBackground: '#ff3838',
        //         },
        //     },
        // }
    },

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
