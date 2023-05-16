import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useMetaStore = defineStore('meta', {
    state: () => ({
        meta: [],
    }),
    
    actions: {
        async getMetaTags() {
            let res = await $axios.get(`/api/meta`)

            this.$state.meta = res.data.meta
        },
        
        async createdMetaTag(form) {
            await $axios.post('/api/meta', form)
            this.getMetaTags()
        },
        
        async updatedMetaTag(metaId, form) {
            return await $axios.put(`/api/meta/${metaId}/update`, form)
        },

        async deletedMetaTag(metaId) {
            return await $axios.delete(`/api/meta`, {
                preserveState: false,
                data: {
                    metaIds: [metaId],
                },
            })
        }

    },

    persist: true
})