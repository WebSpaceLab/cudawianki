<script setup>
definePageMeta({
    layout: "authorization",
})
</script>

<template>
    <x-section-dashboard title="Strona główna" :container="false">
        <template #header-panel>
            
        </template>

        <template #main>

            <div class="w-full h-full flex space-x-5">
                <div class="w-2/3 h-full">
                    <section-hero />
                    
                    <section-offer />
        
                    <section-about />
                </div>
    
                <div class="w-1/3  bg-blue">
    
                </div>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>