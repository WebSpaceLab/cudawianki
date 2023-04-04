<script setup>
    import { usePackagesStore } from '@/stores/packages'
    import { storeToRefs } from 'pinia'
    import {useCategoryStore} from '@/stores/category'

    definePageMeta({
        layout: "default",
    })

    const category = useCategoryStore()

    const { offer } = storeToRefs(usePackagesStore())

    let isHoverCard = ref({
        id: 0 , hover: true
    })

    function hoverCard(event) {
        isHoverCard.value = event
    }
</script>

<template>
    <div class="w-screen container mx-auto">
        <div class="relative w-full h-full flex flex-col justify-start items-center overflow-hidden rounded-lg z-10">
            <img :src="offer[3].image.src" :alt="offer[3].image.alt" class="absolute -top-40 left-0 w-full min-h-screen object-cover rounded-t-lg -z-1">
            
            <div class="w-full h-[500px] bg-black/30  rounded-lg z-10 flex justify-center items-center">
                <h1 class="w-full h-full flex justify-center items-center uppercase bg-scroll text-4xl lg:text-7xl text-transparent bg-clip-text tracking-widest font-black bg-gradient-to-r from-muted-light to-basic-light">
                    {{ offer[5].title }}
                </h1>
            </div>

        </div>

        <x-photo-gallery
            :description="category.$state.data[1].description"
            :name="category.$state.data[1].name"
            :photos="category.$state.data[1].images"
        />
    </div>
</template>