import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useMediaStore = defineStore('media', {
    state: () => ({
        media: [],
        pagination: {
            total: null,
            current_page: null,
            per_page: null,
            first_page: 1,
        }
    }),
    
    actions: {
        async getMedia(page = 2, per_page = 8 ) {
            let res = await $axios.get(`/api/media`, {
                params: {
                    per_page: per_page,
                    page: page
                }
            })

            this.$state.media = res.data.media

            this.$state.pagination.total = res.data.media.total
            this.$state.pagination.current_page = res.data.media.current_page
            this.$state.pagination.per_page = res.data.media.per_page
        },
        
        /* 
        
        async createdMedia(form) {
            await $axios.post('/api/media', form)
        },
        
        */

        async updatedMedia(mediaId, form) {
            return await $axios.put(`/api/media/${mediaId}/update`, form)
        }

    },

    persist: true
})