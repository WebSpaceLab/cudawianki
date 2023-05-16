import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        name: '',
        bio: '',
        avatar_url: ''
    }),
    
    actions: {
        async getTokens() {
            await $axios.get('/sanctum/csrf-cookie')
        },

        async login(email, password) {
            await $axios.post('/login', {
                email: email,
                password: password
            })
        },

        async register(name, email, password, confirmPassword) {
            await $axios.post('/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            })
        },

        async getUser() {
            let res = await $axios.get('/api/logged-in-user')
            
            this.$state.id = res.data[0].id
            this.$state.name = res.data[0].name
            this.$state.bio = res.data[0].bio
            this.$state.avatar_url = res.data[0].avatar_url

            useFlashStore().info(`User ${this.$state.name} has logged in.`)
            return res.data[0]
        },

        async logout() {
            this.resetUser()
            await $axios.post('/logout')
            useFlashStore().info(`user has been logged out.`)
        },

        resetUser() {      
            this.$state.id = ''
            this.$state.name = ''
            this.$state.email = ''
            this.$state.bio = ''
            this.$state.avatar_url = ''
        }

    },

    persist: true
})