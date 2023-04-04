import { defineStore } from 'pinia'

export const useLinksStore = defineStore('links', {
  state: () => {
    return { 
        navbar: [

        ],
        sidebar: [
            {  title: 'Strona główna',  icon: 'ic:sharp-home', name: 'index', path: '/', type: 'basic', role: 'user', children: []},
            {  title: 'Page', icon: 'material-symbols:dashboard-customize-rounded', name: 'dashboard.page', path: '/dashboard/page', role: 'admin', type: 'basic', children: [] },
            {  title: 'Panel główny', icon: 'mdi:desktop-mac-dashboard', name: 'dashboard', path: '/dashboard', role: 'user', type: 'basic', children: [] },
            {  title: 'Media', icon: 'material-symbols:media-link', name: 'dashboard.media', path: '/dashboard/media', role: 'user', type: 'basic', children: [] },
            {  title: 'Ustawienia', icon: 'material-symbols:settings-suggest-outline-sharp', name: 'dashboard.settings', path: '/dashboard/settings', type: 'settings', children: [] },
            {  title: 'Profil', icon: 'material-symbols:manage-accounts-rounded', name: 'dashboard.profile', path: '/dashboard/profile', type: 'settings', children: [] },
        ]
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {

  },
})