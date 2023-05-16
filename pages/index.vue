<script setup>
definePageMeta({
    layout: "default",
})
</script>

<template>
    <div class="w-full h-full container mx-auto snap-y">
        <div class="fixed left-0 top-0 w-screen h-screen -z-1">
            <img class="w-full h-full object-cover" src="/images/vector/background.jpg" alt="background">
        </div>

        <lazy-section-hero :title="$generalStore.title"  :description="$generalStore.description"/>
        
        <lazy-section-offers :offers="$offers.offers"/>

        <section-about />
    </div>
</template>