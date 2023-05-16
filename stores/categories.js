import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios
export const useCategoriesStore = defineStore('categories', {
    state: () => {
        return { 
            categories: [],

            activeCategories: [],

            pagination: {
                total: null,
                current_page: null,
                per_page: null,
                first_page: 1,
            },

            months: [],
            queryParams: {},
            loading: false
        }
    },

    actions: {
        async get() {
            let res = await $axios.get(`/api/categories`)
         
            this.$state.activeCategories = res.data.categories
        },

        async getCategories(page = 1, per_page = 8, month, term, orderBy, orderDir) {
            let res = await $axios.get(`/api/offers/categories`, {
                params: {
                    per_page: per_page,
                    page: page,
                    month: month,
                    term: term,
                    orderBy: orderBy,
                    orderDir: orderDir
                }
            })

            this.$state.categories = res.data.categories

            this.$state.pagination.total = res.data.pagination.total
            this.$state.pagination.current_page = res.data.pagination.current_page
            this.$state.pagination.per_page = res.data.pagination.per_page

            this.$state.months = res.data.months
            this.$state.queryParams = res.data.queryParams
            
        },

        async getOfferCategoriesCreate() {
            return await $axios.get('/api/offers/categories/create')
        },

        async addCategory(form) {
            const res = await $axios.post(`/api/offers/categories`, form)

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
                this.getCategories() 
            }

            return res.data
        },

        async addPhotosToCategory(offerCategoryId, form) {
            const res = await $axios.put(`/api/offers/category/${offerCategoryId}/add-photos`, form)

            useFlashStore().success(res.data.flash.message)

            return  res.data
        },
        
        async updatedCategory(categoryId, form) {
            const res = await $axios.put(`/api/offers/category/${categoryId}/update`, form)

            useFlashStore().success(res.data.flash.message)

            
            this.getCategories()
        },

        async deletedCategory(categoryId) {
            const res = await $axios.delete(`/api/offers/category`, {
                preserveState: false,
                data: {
                    categoriesId: [categoryId],
                },
            })

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
                this.getCategories() 
            }

            return res.data.data
        },

        async deletedPhotosFromCategory(categoryId, mediaId) {
            const res = await $axios.delete(`/api/offers/category/${categoryId}/deleted-photo-from-category`, {
                preserveState: false,
                data: {
                    mediaIds: [mediaId],
                },
            })

            useFlashStore().success(res.data.flash.message)
      
            this.getCategories() 
        }
    },

    persist: true
})