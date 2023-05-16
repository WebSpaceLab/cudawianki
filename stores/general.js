import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useUserStore } from './user'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useGeneralStore = defineStore('general', {
    state: () => ({
        title: '',
        faviconUrl: '/favicon.ico',
        description: '',
        isBackUrl: '/',
        loading: false,
        // siteProperties: {
        //     cookieConsent: false,
        //     copyrightText: '',
        // },

    }),

    actions: {
        // async updateCookieConsent(value) {
        //     this.siteProperties.cookieConsent = value
        // },

        bodySwitch(val) {
            if(val) {
                document.body.style.overflow = 'hidden'
                return
            }

            document.body.style.overflow = 'visible'
        },

        async getGenerals() {
            await $axios.get('/api/general').then(({data}) => {
                if(data.general.length) {
                    this.$state.title = data.general[0].title
                    this.$state.description = data.general[0].description
                    this.$state.faviconUrl = '/favicon.ico'
                } else {
                    this.$state.title = ''
                    this.$state.description = ''
                    this.$state.faviconUrl = '/favicon.ico'
                }

                return data
            }).catch(error => {
                console.log(error)
            })
        },

        async createdGeneral(form) {
            const res = await $axios.post('/api/general', form)
            useFlashStore().success(res.data.flash.message)
            this.getGenerals()
        },

        async update(id, form) {
            const res = await $axios.put(`/api/general/${id}/update`, form)

            useFlashStore().success(res.data.flash.message)
            this.getGenerals()
            return res.data.data
        },
 
        async hasSessionExpired() {
            await $axios.interceptors.response.use((response) => {
                return response
            }, (error) => {
                switch (error.response.status) {
                    case 401: // Not logged in
                    case 419: // Session expired
                    case 503: // Down for maintenance
                        useUserStore().resetUser()
                        window.location.href = '/'
                        break;
                    case 500: 
                        alert('Oops, something went wrong! The team has been notified.')
                        break;
                    default:
                        return Promise.reject(error);
                }   
            })
        }
    },

    getters: {
        // cookieConsent: (state) => state.siteProperties.cookieConsent,
        // copyrightText: (state) => state.siteProperties.copyrightText,
    },

    persist: true
})