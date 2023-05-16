import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.withCredentials = true
    // axios.defaults.baseURL = 'http://localhost:8000'
    axios.defaults.baseURL = 'http://test.web-space.pl'
    // axios.defaults.headers['Content-Type'] ='application/json'

    return {
        provide: { 
            axios: axios
        },
    }
})