<script setup>
    import { usePackagesStore } from '@/stores/packages'
    import { storeToRefs } from 'pinia'

    definePageMeta({
        layout: "default",
    })

    const { offer } = storeToRefs(usePackagesStore())

    let isHoverCard = ref({
        id: 0 , hover: true
    })

    function hoverCard(event) {
        isHoverCard.value = event
    }
</script>

<template>
    <div class="w-screen container mx-auto ">
        <div class="relative w-full h-full flex flex-col justify-start items-center overflow-hidden rounded-lg z-10">
            <img :src="offer[4].image.src" :alt="offer[4].image.alt" class="absolute -top-40 left-0 w-full min-h-screen object-cover rounded-t-lg -z-1">
            
            <div class="w-full h-[500px] bg-blue/30 rounded-t-lg z-10 flex justify-center items-center">
                <h1 class="w-full h-full flex justify-center items-center uppercase bg-scroll text-4xl lg:text-7xl text-transparent bg-clip-text tracking-widest font-black bg-gradient-to-r from-blue-500 to-basic-light">
                    {{ offer[4].title }}
                </h1>
            </div>

            <div class="w-full  relative bg-background-light dark:bg-background-dark z-10">
                <div class="-translate-y-30 w-full h-full relative px-8 lg:px-15 py-12 box-border">
                    <div class="w-full flex flex-col lg:flex-row justify-center items-center space-y-10 lg:space-y-0 lg:space-x-20">
                        <div v-for="item in offer[4].content" :key="item.id" class="w-full h-[400px] bg-blue-600 rounded-xl" data-aos-delay="200" :data-aos="item.transition" data-aos-duration="1000">
                            <card :item="item" @hover="hoverCard">
                                <template #decoration>
                                    <transition
                                        enter-active-class="transition ease-in duration-500"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-800"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <img v-if="isHoverCard.id === item.id" src="/images/png/remka.png" alt="Ramka" class="absolute -top-15 -right-10 rotate-90 z-10" />
                                    </transition>
                                    
                                    <transition
                                        enter-active-class="transition ease-in duration-800"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-500"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <img v-if="isHoverCard.id === item.id" src="/images/png/remka.png" alt="Ramka" class="absolute -bottom-15 -left-10 rotate-270 z-10" />
                                    </transition>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>