import { useUserStore } from "~~/stores/user";
import {  useGeneralStore } from "~~/stores/general";
import { useProfileStore } from "~~/stores/profile";
import { useMediaStore } from "~~/stores/media";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            userStore: useUserStore(),
            profileStore: useProfileStore(),
            generalStore: useGeneralStore(),
            mediaStore: useMediaStore()
        }
    }
})