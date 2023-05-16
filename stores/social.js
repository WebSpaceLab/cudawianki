import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useSocialStore = defineStore('social', {
  state: () => {
    return { 
        social: []
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async getSocialMedia() {
      let res = await $axios.get(`/api/social`)

      this.$state.social = res.data.social

      return res
    },
    
    async createdSocialMedia(form) {
      const res = await $axios.post('/api/social', form)
      
      useFlashStore().success(res.data.flash.message)

      this.getSocialMedia()
      
      return res.data.data
    },
    
    async updatedSocialMedia(socialId, form) {
      const res = await $axios.put(`/api/social/${socialId}/update`, form)

      useFlashStore().success(res.data.flash.message)
      
      this.getSocialMedia()
      
      return res.data.data
    },

    async deletedSocialMedia(socialId) {
      const res = await $axios.delete(`/api/social`, {
        preserveState: false,
        data: {
          socialIds: [socialId],
        },
      })

      useFlashStore().success(res.data.flash.message)
      
      this.getSocialMedia()
      
      return res.data.data
    }
  },
  persist: true
})