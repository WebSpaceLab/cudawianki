import { defineStore } from 'pinia'

export const useLinksStore = defineStore('links', {
  state: () => {
    return { 
        navbar: [

        ],
        
        sidebar: [
            {  title: 'Homepage',  icon: 'ic:sharp-home', name: 'index', path: '/', type: 'basic', role: 'user', children: []},

            {  title: 'Offers', icon: 'gis:tags', name: 'dashboard.offers', path: '/dashboard/offers', role: 'admin', type: 'basic', children: [
              {  title: 'Create', icon: 'material-symbols:add-circle-rounded', name: 'dashboard.offers.create', path: '/dashboard/offers/create', role: 'admin', type: 'basic', children: []},
              
              {  title: 'Categories', icon: 'carbon:category', name: 'dashboard.offers.categories', path: '/dashboard/offers/categories', role: 'admin', type: 'basic', children: [
                {  title: 'Create', icon: 'material-symbols:add-circle-rounded', name: 'dashboard.offers.categories.create', path: '/dashboard/offers/categories/create', role: 'admin', type: 'basic', children: []}
              ] },
            ] },

            {  title: 'Dashboard', icon: 'mdi:desktop-mac-dashboard', name: 'dashboard', path: '/dashboard', role: 'user', type: 'basic', children: [] },
            
            {  title: 'Inbox', icon: 'material-symbols:forward-to-inbox-sharp', name: 'dashboard.inbox', path: '/dashboard/inbox', role: 'user', type: 'basic', children: [] },

            {  title: 'Media', icon: 'material-symbols:media-link', name: 'dashboard.media', path: '/dashboard/media', role: 'user', type: 'basic', children: [] },

            {  title: 'About', icon: 'material-symbols:settings-account-box-outline', name: 'dashboard.about', path: '/dashboard/about', role: 'admin', type: 'basic', children: [] },
            
            {  title: 'Settings', icon: 'material-symbols:settings-suggest-outline-sharp', name: 'dashboard.settings', path: '/dashboard/settings', type: 'settings', children: [] },

            {  title: 'Profile', icon: 'material-symbols:manage-accounts-rounded', name: 'dashboard.profile', path: '/dashboard/profile', type: 'settings', children: [] },
        ]
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {

  },
})