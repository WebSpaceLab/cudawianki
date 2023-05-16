<script setup>
import { storeToRefs } from 'pinia'

definePageMeta({
    layout: "default",
})

const { $categories } = useNuxtApp()
const { activeCategories } = storeToRefs($categories)


const {category} = useRoute().params

const categoryPreview = ref({})

function categoryFilter() {
    categoryPreview.value = activeCategories.value.filter(item => item.slug === category)
}

onMounted(() => {
    categoryFilter()
})
</script>

<template>
    <section-category v-if="categoryPreview" :category="categoryPreview[0]" />
</template>