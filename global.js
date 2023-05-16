const GlobalSettings = {
    development: {
        siteEnv: 'Dev',
        googleTagManagerKey: 'GTM-KQTXX7K',
        googleTagManagerEnabled: true,
        googleTagManagerDebug: true,
    },

    staging: {
        siteEnv: 'Test',
        googleTagManagerKey: 'GTM-KQTXX7K',
        googleTagManagerEnabled: true,
        googleTagManagerDebug: true,
    },
    
    production: {
        siteEnv: '',
        googleTagManagerKey: 'GTM-KQTXX7K',
        googleTagManagerEnabled: true,
        googleTagManagerDebug: false,
    }
}

export { GlobalSettings }