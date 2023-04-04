import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
    state: () => ({
        id: '',
        name: '',
        bio: '',
        avatar_url: '',
        post: null,
        posts: null,
        allLikes: 0,
        fallowing: null
    }),
    
    actions: {

    },
        
    persist: true
})