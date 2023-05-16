<script setup>
    import { storeToRefs } from 'pinia'

    definePageMeta({
        layout: "default",
    })
    const { $offers } = useNuxtApp()

    const { offers } = storeToRefs($offers)

    const {slug} = useRoute().params

    const offerPreview = ref({})

    function offerFilter() {
        offerPreview.value = offers.value.filter(offer => offer.slug === slug)
    }

    onMounted(() => {
        offerFilter()
    })
</script>

<template>
    <div class="w-screen">
        <section-offer v-if="offerPreview.length" :offer="offerPreview[0]" />
    </div>
</template>