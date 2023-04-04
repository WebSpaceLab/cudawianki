<script setup>
import {useCategoryStore} from '@/stores/category'

definePageMeta({
    layout: "default",
})

const category = useCategoryStore()
</script>

<template>
    <x-photo-gallery
        :description="category.$state.data[0].description"
        :name="category.$state.data[0].name"
        :photos="category.$state.data[0].images"
    />
</template>