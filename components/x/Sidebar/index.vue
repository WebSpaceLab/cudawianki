<script setup>
const props = defineProps({
    isShow: {
        type: Boolean,
    },
    isRightSide: {
        type: Boolean,
    },
    isRailSidebar: {
        type: Boolean,
    },
    links: {
        type: Array
    },
});

let openSubitems = ref(false);
const search = ref('')

function typeLinks(type) {
    const links = [];

    props.links.forEach(element => {
        if(element.type === type) {
            links.push(element);
        }
    });

    return links;
}
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 -translate-x-64"
        enter-to-class="transform opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform opacity-100 translate-x-0"
        leave-to-class="transform opacity-0 -translate-x-64"
    >
        <div
            v-show="isShow"
            class="fixed top-0 lg:relative flex min-h-full z-60"
            :class="[
                isRightSide ? 'right-0' : 'left-0',
                isRailSidebar ? 'w-14' : 'w-64'
            ]"
        >

            <div
                :class="[
                    isRailSidebar ? 'w-14' : 'w-64',
                ]"
                class="fixed left-0 top-0 h-screen  shadow-lg shadow-black bg-gradient-to-r from-second-light/80 to-prime-light/80 dark:from-second-dark/80 dark:to-prime-dark/80 backdrop-blur  overscroll-contain box-border flex flex-col justify-between"
            >

                <div class="w-full relative">
                    <div class="w-full h-15 flex justify-center pt-3 items-center box-border">
                        <logo class="w-15 "/>
                    </div>

                    <x-border class="" yt="4" yb="4" color=""/>

                    <div class="flex justify-center items-center px-4 box-border transition-all duration-300 ease-in">
                        <x-btn v-if="isRailSidebar" color="secondary" strip icon>
                            <Icon name="bi:search" class="text-xl"></Icon>
                        </x-btn>

                        <x-search  v-model="search" icon iconPosition="right" v-else />
                    </div>

                    <x-border class="hidden lg:flex" yt="4" yb="4" color=""/>

                    <nav class="w-full">
                        <ul class="list-none overflow-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[isRailSidebar ? 'w-10' : 'w-full']">
                            <template v-for="(link, index) in typeLinks('basic')" :key="index">
                                <x-sidebar-item :link="link" :isRailSidebar="isRailSidebar" />
                            </template>
                        </ul>
                    </nav>

                </div>

                <div class="ease-in mb-12">
                    <div class="flex items-center justify-start " :class="[isRailSidebar ? 'flex-col': 'flex-row']">

                    </div>

                    <x-border class="hidden lg:flex" yt="4" yb="4" color=""/>

                    <div class="px-2 pt-4">
                        <ul class="list-none overflow-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[isRailSidebar ? 'w-10' : 'w-full']">
                            <template v-for="(link, index) in typeLinks('settings')" :key="index">
                                <x-sidebar-item :link="link" :isRailSidebar="isRailSidebar" />
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </transition>
</template>