import { defineStore } from 'pinia'

export const useSocialStore = defineStore('social', {
  state: () => {
    return { 
        data: [
            {
                name: 'facebook',
                icon: 'mdi:facebook',
                to: 'https://www.facebook.com/cudawiankisuwalki'
            },
            {
                name: 'Instagram',
                icon: 'bi:instagram',
                to: 'https://www.instagram.com/cuda_wianki_suwalki/'
            }
        ]
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})