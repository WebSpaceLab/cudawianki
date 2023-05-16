import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useMediaStore = defineStore('media', {
    state: () => ({
        media: [],
        pagination: {
            total: null,
            current_page: null,
            per_page: null,
            first_page: 1,
        },
        fileTypes: [],
        months: [],
        queryParams: {}
    }),
    
    actions: {
        async getMedia(page = 2, per_page = 8, fileType, month, term, orderBy, orderDir ) {
            let res = await $axios.get(`/api/media`, {
                params: {
                    per_page: per_page,
                    page: page,
                    fileType: fileType,
                    month: month,
                    term: term,
                    orderBy: orderBy,
                    orderDir: orderDir
                }
            })

            this.$state.media = res.data.media

            this.$state.pagination.total = res.data.pagination.total
            this.$state.pagination.current_page = res.data.pagination.current_page
            this.$state.pagination.per_page = res.data.pagination.per_page

            this.$state.fileTypes = res.data.fileTypes
            this.$state.months = res.data.months
            this.$state.queryParams = res.data.queryParams
        },
        
        async updatedMedia(mediaId, form) {
            const res = await $axios.put(`/api/media/${mediaId}/update`, form)

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.getMedia() 
            }

            return res.data
        },

        async deletedMedia(mediaId) {
            const res = await $axios.delete(`/api/media`, {
                preserveState: false,
                data: {
                    mediaIds: [mediaId],
                },
            })

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.getMedia() 
            }

            return res.data.data
        }
    },

    persist: true
})