<script setup>
definePageMeta({
    layout: "authorization",
})
</script>

<template>
    <x-section-dashboard title="Panel główny" :container="false">
        <template #header-panel>
            
        </template>

        <template #main>
            <h1 text-red-400>
                Page 2 test
            </h1>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>