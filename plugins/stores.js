import { useUserStore } from "~~/stores/user";
import { useGeneralStore } from "~~/stores/general";
import { useProfileStore } from "~~/stores/profile";
import { useMediaStore } from "~~/stores/media";
import { useMetaStore } from "~~/stores/meta";
import { useSocialStore } from "~~/stores/social";
import { useContactStore } from "~~/stores/contact";
import { useFlashStore } from "~~/stores/flash";
import { useLinksStore } from "~~/stores/links";
import { useOffersStore } from "~~/stores/offers";
import { useCategoriesStore } from "~~/stores/categories";
import { useInboxStore } from "~~/stores/inbox";
import { useAboutStore } from "~~/stores/about";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            userStore: useUserStore(),
            profileStore: useProfileStore(),
            generalStore: useGeneralStore(),
            mediaStore: useMediaStore(),
            metaStore: useMetaStore(),
            social: useSocialStore(),
            contact: useContactStore(),
            flash: useFlashStore(),
            links: useLinksStore(),
            offers: useOffersStore(),
            categories: useCategoriesStore(),
            inbox: useInboxStore(),
            about: useAboutStore(),
        }
    }
})