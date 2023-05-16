<script setup>
    import { useNavbar } from '@/stores/navbar'
    import { storeToRefs } from 'pinia'

    const {$userStore, $social, $offers, $generalStore} = useNuxtApp()

    const router = useRouter()

    const { intro,  isShowIntro, isShowIntroLogo, isShowMenu, isScroll, scrollNavbar } = useIntro()
    const setColorTheme = (newTheme) => {
        useColorMode().preference = newTheme
    }
    
    const navbar = useNavbar()
    const {social} = storeToRefs($social)
    
    const { offers } = storeToRefs($offers)
    let bufferOfferId = ref(null)

    onMounted(() => {
     
            intro()
        
        scrollNavbar()
    })

    const logout = () => {
        try {
            $userStore.logout()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    function activateDropdown(offerId) {
        if(offerId !== null) {
            bufferOfferId.value = offerId
            navbar.activate()
        } else {
            bufferOfferId.value = offerId
            navbar.close()
        }
    }

</script>

<template>
    <teleport to="body">
        <transition                                
            enter-active-class="transition ease-in duration-200"
            enter-from-class="transform scale-100 opacity-0 blur-100 grayscale"
            enter-to-class="transform scale-100 opacity-100 blur-0 grayscale-0"
            leave-active-class="transition ease-in duration-1000"
            leave-from-class="transform opacity-100 scale-100 translate-x-0 translate-y-0 blur-0 brightness-0"
            leave-to-class="transform opacity-0 scale-60 translate-x-50 -translate-y-10 blur-100 brightness-500"
        >
            <div v-if="isShowIntro" class="h-screen w-screen fixed top-0 left-0 z-100 bg-background-light/80 dark:bg-background-dark/80 ">
                <video  id="intro-video" class="min-w-screen h-screen" src="/movie/intro.mp4" autoplay muted></video>
            </div>
        </transition>
    </teleport>
    
    <x-layout v-if="!isShowIntro || !$generalStore.loading">
        <template #header>
            <div class="relative ">
            
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
                                <x-link @click="navbar.closeMenuSm" color="white" :to="{path: '/'}" stress  @mousemove="activateDropdown(null)">Strona główna</x-link>
                            </li>

                            <li v-if="$offers.offers.length != 0" class="list-none ">
                                <x-link-hash @click="navbar.closeMenuSm" color="white" :to="{path: '/', hash: '#offer'}"  text="Oferta"  stress hash="#offer" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>

                            <li v-if="$about.activeAbout.length != 0" class="list-none ">
                                <x-link-hash @click="navbar.closeMenuSm" color="white" :to="{path: '/', hash: '#o-nas'}"  text="O nas"  stress hash="#o-nas" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>
                            
                            <li v-for="item in $offers.offers" :key="item.id" class="list-none">
                                <x-link
                                    :to="{path: item.path }"
                                    @click="navbar.closeMenuSm"
                                    @mousemove="activateDropdown(item.categories.length == 0 ? null : item.id)"
                                    color="white"
                                    stress
                                >
                                    {{ item.title }}
                                </x-link>
                            </li>

                            <li class="list-none ">
                                <x-link @click="navbar.closeMenuSm" color="white" to="/kontakt" text="Kontakt" stress @mousemove="activateDropdown(null)"></x-link>
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

                        <template v-for="(item, index) in social" :key="index">
                            <x-link
                                v-if="item.is_active == true"
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
                                    <x-dropdown-link @click="logout()" class="mt-2 bg-danger-600 rounded">
                                        <span class="text-red-200 uppercase font-bold">Logout</span>
                                    </x-dropdown-link>
                                </template>
                            </x-dropdown-manage-account>
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
                                <ul v-if="bufferOfferId !== null" class="w-full h-full flex  justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5">
                                    <template v-for="offer in offers" :key="offer.id" >
                                        <li v-if="offer.id === bufferOfferId" class="list-none h-40 flex space-x-5">
                                            <card-small class="w-40 " v-for="category in offer.categories" :key="category.id"  :item="category" />
                                        </li>
                                    </template>
                                </ul>
                            </transition>
                        </navbar-dropdown>
                    </template>
                </Navbar>
            </div>
        </template>

        <template #main>
            <div v-if="!isShowIntroLogo && !isShowIntro" class="m-0">
                <slot  />
            </div>
        </template>

        <template #footer>
            <Footer />
        </template>

    </x-layout>
</template>

