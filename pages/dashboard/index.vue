<script setup>
definePageMeta({
    layout: "authorization",
})
</script>

<template>
    <x-section-dashboard title="Dashboard" :container="false">
        <template #header-panel>
            
        </template>

        <template #main>
            <div class="container mx-auto flex flex-col space-20">
                
                <div class="w-full h-500px grid md:grid-cols-4 gap-30">
                    <div class="row-span-1 bg-blue rounded-xl">
                        
                    </div>

                    <div class="row-span-1 bg-blue rounded-xl"></div>
                    <div class="row-span-1 bg-blue rounded-xl"></div>
                    <div class="row-span-1 bg-blue rounded-xl"></div>

                    <div class="col-span-full  row-span-1  bg-blue rounded-xl"></div>

                    <div class="row-span-1 bg-blue rounded-xl">
                        
                    </div>

                    <div class="row-span-1 bg-blue rounded-xl"></div>
                    <div class="row-span-1 bg-blue rounded-xl"></div>
                    <div class="row-span-1 bg-blue rounded-xl"></div>
                </div>


                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>