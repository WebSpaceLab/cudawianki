<script setup>
import { useNavbar } from '@/stores/navbar'

const { isScroll, scrollNavbar } = useIntro()

const props = defineProps({
    isShowIntroLogo: Boolean,
    isShowMenu: Boolean,
})
const navbar = useNavbar()
// let isShowSm = ref(false)

onMounted(() => {
    scrollNavbar()
})
</script>

<template>
    <nav id="main-nav" class="w-screen h-20  shadow-lg shadow-black" :class="isScroll ? 'fixed top-0 left-0 bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80 backdrop-blur-sm' : 'relative lg:h-30'">
        <div class="container mx-auto h-full flex items-center justify-center lg:justify-between ">
            <div class="relative  hidden lg:block">
                <slot name="logo" />
            </div>
        
            <div v-if="!isShowIntroLogo" class="lg:hidden absolute top-6 left-0 px-3">
                <x-btn @click="navbar.openMenuSm" class="btn-primary-outline" strip ring icon>
                    <template #icon>
                        <Icon name="la:bars" class="text-xl"/>
                    </template>
                </x-btn>
            </div>

            <div class="w-full hidden lg:block">
                <transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="transform  -translate-y-200"
                    enter-to-class="transform  translate-y-0"
                    leave-active-class="transition ease-in duration-300"
                    leave-from-class="transform -translate-y-0"
                    leave-to-class="transform -translate-y-100"
                >
                    <div class="relative w-full flex justify-around items-center" :class="isShowMenu || isScroll ? 'show-content px-3' : 'hidden-content'">
                        <div class="flex w-full justify-center items-center space-x-10">
                            <slot name="content" />
                        </div>
    
                        <div class="w-70 flex  justify-end pr-6">
                            <slot name="action" />
                        </div>
                    </div>
                </transition>
            </div>

            <div v-if="!isShowIntroLogo" class="absolute top-5 right-5 lg:hidden flex justify-center items-center mr-4">
                <slot name="action" />
            </div>
        </div>

        
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform -translate-x-100"
            enter-to-class="transform -translate-x-0"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="transform -translate-x-0"
            leave-to-class="transform -translate-x-100"
        >
            <div v-if="navbar.$state.isShowSm" class="h-screen fixed top-0 left-0 lg:hidden z-60 bg-second-light dark:bg-second-dark">
                <div class="w-full relative flex flex-col justify-start items-start p-8">
                    <img src="/images/png/remka.png" alt="Ramka" class="absolute -top-20 scale-80 right-3 rotate-90 z-10">

                    <div class="h-10 absolute top-3 left-3 ">
                        <x-btn @click="navbar.closeMenuSm" class="btn-danger-outline" strip ring icon>
                            <template #icon>
                                <Icon name="ic:baseline-close" class="text-xl"/>
                            </template>
                        </x-btn>
                    </div>

                    <div class="-translate-y-15 w-60 h-30">
                        <slot name="logo" />
                    </div>

                    <slot name="content" />
                </div>
            </div>
        </transition>

        <div class="hidden lg:flex w-screen">

            <slot name="dropdown-field"></slot>
        </div>
    </nav>
</template>

<style scoped>
/* .show-content {
    animation: show-content 1s linear;
}

.hidden-content {
    animation: hidden-content 1s linear;
}

.logo-in-left {
    animation: in-left .5s linear;
} */

@keyframes show-content {
    0% {
        width: 0;
        transform: translateY(-50px);
        opacity: 0;
    }
    25% {
        width: 10%;
        transform: translateY(0);
        opacity: 0;
    }
    50% {
        width: 50%;
        transform: translateY(0);
        opacity: 0.3;
    }

    75% {
        width: 75%;
        transform: translateY(0);
        opacity: .6;
    }

    100% {
        width: 100%;
        transform: translateY(0);
        opacity: .9;
    }
}

@keyframes hidden-content {
    0% {
        width: 100%;
        transform: translateY(0);
        opacity: 1;
    }
    25% {
        width: 75%;
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        width: 50%;
        transform: translateY(0);
        opacity: 1;
    }

    75% {
        width: 10%;
        transform: translateY(0);
        opacity: 0;
    }

    100% {
        width:  0;
        transform: translateY(-50px);
        opacity: 0;
    }
}


@keyframes in-left {
    0% {
        transform: translateX(50vw);
    }
    25% {
        transform: translateX(37vw);
    }
    50% {
        transform: translateX(25vw);
    }

    75% {
        transform: translateX(12vw);
    }

    100% {
        transform: translateX(0);
    }
}
</style>