<script setup>
import {useCategoryStore} from '@/stores/category'

definePageMeta({
    layout: "default",
})

const category = useCategoryStore()

</script>

<template>
    <x-photo-gallery
        :description="category.$state.data[1].description"
        :name="category.$state.data[1].name"
        :photos="category.$state.data[1].images"
    />
</template>