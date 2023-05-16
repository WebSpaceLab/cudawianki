import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useAboutStore = defineStore('about', {
    state: () => {
        return {
            about : [],

            activeAbout: [],

            pagination: {
                total: null,
                current_page: null,
                per_page: null,
                first_page: 1,
            },

            months: [],
            queryParams: {},
            status: []
        }
    },

    actions: {
        async get() {
            let res = await $axios.get(`/api/about`)
         
            this.$state.activeAbout = res.data.about
        },

        async getAbout(query, perPage) {
            let res = await $axios.get(`/api/dashboard/about`, {
                params: {
                    term: query.term,
                    status: query.status,
                    month: query.month,
                    orderBy: query.orderBy,
                    orderDir: query.orderDir,
                    per_page: perPage
                }
            })
         
            this.$state.about = res.data.about

            this.$state.pagination.total = res.data.pagination.total
            this.$state.pagination.current_page = res.data.pagination.current_page
            this.$state.pagination.per_page = res.data.pagination.per_page

            this.$state.months = res.data.months
            this.$state.status = res.data.status
            this.$state.queryParams = res.data.queryParams   
        },

        async store(form) {
            return await $axios.post(`/api/dashboard/about`, form).then(({data}) => {
                useFlashStore().success(data.flash.message)
       
            }).catch((err) => {
                console.error(err)
            })
        },
        
        async update(aboutId, form) {
            const res = await $axios.put(`/api/dashboard/about/${aboutId}/update`, form)

            if(res.data.succeed) {
                useFlashStore().success(res.data.flash.message)
            }

            return res.data
        },

        async destroy(aboutId) {
            const res = await $axios.delete(`/api/dashboard/about`, {
                preserveState: false,
                data: {
                    aboutIds: [aboutId],
                },
            })

            if(res.data.succeed) {
                useFlashStore().success(res.data.flash.message)
            }
   
            return res.data.data
        }
    },

    persist: true
  })