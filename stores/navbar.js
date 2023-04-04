import { defineStore } from 'pinia'

export const useNavbar = defineStore('navbar', {
  state: () => {
    return { 
      isNavbarDropdown: false,
      isZoom: false,
      isShowSm: false
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    activate() {
      this.isNavbarDropdown = true
    },
    close() {
      this.isNavbarDropdown = false
    },
    openMenuSm() {
      this.isShowSm = true
    },
    closeMenuSm() {
      this.isShowSm = false
    },
    switchOpenMenuSm() {
      this.isShowSm = !this.isShowSm
    }
  },
})