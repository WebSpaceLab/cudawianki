import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useInboxStore = defineStore('inbox', {
    state: () => ({
        mails: [],
        pagination: {
            total: null,
            current_page: null,
            per_page: null,
            first_page: 1,
        },
        months: [],
        queryParams: {},
        read: []
    }),
    
    actions: {
        async getMails(query, perPage ) {
            let res = await $axios.get(`/api/dashboard/inbox`, {
                params: {
                    term: query.term,
                    read: query.read,
                    month: query.month,
                    orderBy: query.orderBy,
                    orderDir: query.orderDir,
                    per_page: perPage
                }
            })

            this.$state.mails = res.data.mails

            this.$state.pagination.total = res.data.pagination.total
            this.$state.pagination.current_page = res.data.pagination.current_page
            this.$state.pagination.per_page = res.data.pagination.per_page

            this.$state.read = res.data.read
            this.$state.months = res.data.months
            this.$state.queryParams = res.data.queryParams
            
        },

        async send(form) {
           return await $axios.post('/api/dashboard/inbox', form)
        },

        async mailHasBeenReed(mailId) {
            return await $axios.put(`/api/dashboard/inbox/${mailId}/read`)
         },

        async deletedMail(mailId) {
            const res = await $axios.delete(`/api/dashboard/inbox`, {
                preserveState: false,
                data: {
                    mailIds: [mailId],
                },
            })

            useFlashStore().success(res.data.flash.message)

            return res.data.data
        }
    },

    persist: true
})