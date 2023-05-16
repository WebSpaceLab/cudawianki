import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useContactStore = defineStore('contact', {
    state: () => ({
        id: 1,
        title: '',
        description: '',
        logo: '/images/png/logo.png',
        address: '',
        openingHours: '',
        phone: '',
        map: '',

        errors: [],
        loading: false,
    }),

    actions: {
        async get() {
            this.$state.loading = true 

            await $axios.get('/api/contact').then(({data}) => {
                if(data.contact.length) {
                    this.$state.title = data.contact[0].title
                    this.$state.description = data.contact[0].description
                    this.$state.address = data.contact[0].address
                    this.$state.openingHours = data.contact[0].openingHours
                    this.$state.phone = data.contact[0].phone
                    this.$state.map = data.contact[0].map
                } else {
                    this.$state.title = ''
                    this.$state.description = ''
                    this.$state.address = ''
                    this.$state.openingHours = ''
                    this.$state.phone = ''
                    this.$state.map = ''
                }
                
                return data
            }).catch(error => {
                console.log(error)

                this.$state.errors = error.response.data
            }).finally (() => {
                this.$state.loading = false
            })
        },

        async create(form) {
            const res = await $axios.post('/api/contact', form)

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.get() 
            }

            return res.data.data
        },

        async update(id, form) {
            const res = await $axios.put(`/api/contact/${id}/update`, form)

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.get() 
            }

            return res.data.data
        },

        async delete(id) {
            const res = await $axios.delete(`/api/contact`, {
                preserveState: false,
                data: {
                    contactIds: [id],
                },
            })

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.get() 
            }

            return res.data.data
        }
    },

    persist: true
})