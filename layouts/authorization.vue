<script setup>
import { storeToRefs } from 'pinia'
import { useLinksStore } from '@/stores/links'

const {$userStore, $social} = useNuxtApp()

const router = useRouter()

const { sidebar } = storeToRefs(useLinksStore()) 

const { isShowSidebar, isRightSide, toggleShow, switchSide, isRailSidebar, changeSizeSidebar } = useSidebar();
const { social } = storeToRefs($social)

const setColorTheme = (newTheme) => {
    useColorMode().preference = newTheme
}

function checkAccessUser() {
    if(!$userStore.id) {
        useRouter().push('/auth/login')
        return false
    }

    return true
}

const logout = () => {
    try {
        $userStore.logout()
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    checkAccessUser()
})
</script>

<template>
    <!--
        <div v-if="isAuthLoading" class="w-full h-full flex justify-center items-center">
            <Spinner :loading="isAuthLoading" />
        </div>
    -->
    <x-layout >
        <template #header>
            <div class="w-screen flex justify-end">
                <NavbarDashboard :isRailSidebar="isRailSidebar" :isShowSidebar="isShowSidebar">
                    <template  #bar>
                        <div
                            class="flex justify-start px-4"
                            :class="[isRailSidebar ? '' : 'w-64']"
                        >
                            <x-btn @click="toggleShow" class=" bg-slate-400/80 hover:bg-slate-600/80" color="secondary" rounded icon>
                                <Icon v-if="isShowSidebar" class="text-2xl" name="mdi:close" />
                                <Icon v-else class="text-2xl" name="material-symbols:menu-rounded" />
                            </x-btn>
    
                            <x-btn v-if="isShowSidebar" @click="changeSizeSidebar" color="secondary" class="hidden lg:inline-block ml-3 bg-slate-400/80 hover:bg-slate-600/80" rounded icon>
                                <Icon class="text-2xl transition-all duration-300 ease-in" name="material-symbols:swap-horizontal-circle-rounded" :class="{'rotate-180' : isRailSidebar}"/>
                            </x-btn>
                        </div>
                    </template>
    
                    <template  #content>
    
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
                </NavbarDashboard>
            </div>
        </template>
        
        <template #main>
            <x-sidebar :is-show="isShowSidebar" :is-rail-sidebar="isRailSidebar" :links="sidebar" />
            

            <x-main :is-show-sidebar="isShowSidebar" :is-rail-sidebar="isRailSidebar">
                <slot/>
            </x-main>
        </template>
            
   
    </x-layout>

</template>