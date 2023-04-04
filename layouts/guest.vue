<script setup>
    import { useNavbar } from '@/stores/navbar'
    import { usePackagesStore } from '@/stores/packages'
    import { storeToRefs } from 'pinia'
    import { useSocialStore } from '@/stores/social'

    const {$userStore, $generalStore } = useNuxtApp()
    const { isLoginOpen } = storeToRefs($generalStore)

    const route = useRoute()
    const router = useRouter()

    const { isShowIntro, isShowIntroLogo, showMenu, isShowMenu, isScroll, scrollNavbar } = useIntro()
    const setColorTheme = (newTheme) => {
        useColorMode().preference = newTheme
    }
    
    const navbar = useNavbar()
    const social = useSocialStore()
    
    const { offer } = storeToRefs(usePackagesStore())

    let packIndex = ref(0);
    let isCloseMenuSM = ref(false);

    onMounted(() => {
        $generalStore.bodySwitch(false)
        isLoginOpen.value = false

        isLoggedIn()
        scrollNavbar()
    })

    function activateDropdown(index) {
        if(index !== null) {
            packIndex.value = index
            navbar.activate()
        } else {
            packIndex.value = index
            navbar.close()
        }
    }

    const isLoggedIn = () => {
        if($userStore.id) {
            router.push('/')
        }
    }

    const logout = () => {
        try {
            $userStore.logout()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    watch(() => isLoginOpen.value, (val) => $generalStore.bodySwitch(val))
</script>

<template>
    <x-layout>
        <template #header>
            <div class="relative z-100">
                <Navbar v-if="!isShowIntro" :isShowIntroLogo="isShowIntroLogo" :isShowMenu="isShowMenu" >
                    <template #logo>
                        <div class="flex justify-center items-center transition-all duration-500 linear" :class="[ !isShowIntroLogo ? isScroll ? ' lg:w-20 lg:h-20' : 'lg:w-30 lg:h-30 ' : '']">
                            <div class=" w-full h-full transition-all duration-500 linear" :class="[!isShowIntroLogo ? isScroll ? 'relative scale-30 lg:scale-60' : 'relative scale-30 lg:scale-100 lg:pl-6 ' : '' ]">
                                <div class="w-full h-full transition-all duration-500 linear lg:cursor-pointer" >
                                    <logo  />
                                </div>
                            </div>
                        </div>
                    </template>

                    <template  #content>
                        <ul class="flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-5 ">
                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm"  :to="{path: '/'}" stress  @mousemove="activateDropdown(null)">Strona główna</x-link>
                            </li>

                            <li class="list-none ">
                                <x-link-hash @click="navbar.closeMenuSm"  :to="{path: '/', hash: '#offer'}"  text="Oferta"  stress hash="#offer" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>

                            <li class="list-none ">
                                <x-link-hash @click="navbar.closeMenuSm"  :to="{path: '/', hash: '#o-nas'}"  text="O nas"  stress hash="#o-nas" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>

                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm"  :to="{path: '/oferta/balony' }" stress @mousemove="activateDropdown(0)">Balony</x-link>
                            </li>

                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm"   :to="{path: '/oferta/kwiaty' }" stress @mousemove="activateDropdown(1)">Kwiaty</x-link>
                            </li>

                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm"  :to="{path: '/oferta/strojenia' }" stress @mousemove="activateDropdown(2)">Strojenia</x-link>
                            </li>

                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm"  :to="{path: '/oferta/wianki' }" stress @mousemove="activateDropdown(null)">Wianki</x-link>
                            </li>

                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm"  :to="{path: '/oferta/wiazanki' }" stress @mousemove="activateDropdown(4)">Wiązanki</x-link>
                            </li>

                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm"  to="/kontakt" text="Kontakt" stress @mousemove="activateDropdown(null)"></x-link>
                            </li>
                        </ul>
                    </template>

                    <template #action>
                        <x-btn @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" color="secondary" :tooltip="{text: `Zmień motyw na ${$colorMode.value == 'dark' ? 'jasny' : 'ciemny'}`}" ring strip icon class="mr-3">
                            <template #icon>
                                <Icon v-if="$colorMode.value == 'dark'" class="text-lg" name="line-md:moon-filled-loop" />
                                <Icon v-else class="text-lg" name="line-md:moon-filled-to-sunny-filled-loop-transition" />
                            </template>
                        </x-btn>

                        <template v-for="(item, index) in social.$state.data" :key="index">
                            <x-link
                                :to="item.to"
                                class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                                target="_blank"
                            >
                                <Icon :name="item.icon" class="text-2xl" />
                            </x-link>
                        </template>

                        <div class="h-full flex items-center justify-center" v-if="$userStore.id" >
                            <x-dropdown-manage-account :user="$userStore" >
                                <template #links>
                                    <x-dropdown-link to="/dashboard" class="text-muted-light dark:text-muted-dark mb-2">
                                        Dashboard
                                    </x-dropdown-link>
                    
                                    <x-dropdown-link to="/dashboard/profile" class="text-muted-light dark:text-muted-dark mb-2"  >
                                        Profile
                                    </x-dropdown-link>

                                    <!-- Authentication -->
                                    <x-dropdown-link @click="handleUserLogout" class="mt-2 bg-danger-600 rounded">
                                        <span class="text-red-200 uppercase font-bold">Wyloguj się</span>
                                    </x-dropdown-link>
                                </template>
                            </x-dropdown-manage-account>
                        </div>

                        <div v-else> 
                            <x-btn @click="isLoginOpen = true" color="primary-outline" class="rounded-tl-2xl rounded-br-2xl" shadow text="Log in"/>
                        </div>
                    </template>

                    <template #dropdown-field>
                        <navbar-dropdown>
                            <transition
                                enter-active-class="transition ease-in duration-500"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-800"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <ul v-if="packIndex !== null" class="w-full h-full flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5">

                                    <li v-for="pack in offer[packIndex].content" :key="pack.id" class="list-none w-40 h-40">
                                        <card-small :item="pack" />
                                    </li>
                                </ul>
                            </transition>
                        </navbar-dropdown>
                    </template>
                </Navbar>
            </div>
        </template>

        <template #main>

            <div class="m-0">
                <slot  />
            </div>
        </template>

        <template #footer>
            <Footer />
        </template>
    </x-layout>
</template>