<script setup>
definePageMeta({
    layout: "authorization",
})

</script>

<template>
    <x-section-dashboard title="Settings" :container="false">
        <template #header-panel>
            
        </template>

        <template #main>
            <div class="w-full container mx-auto">
                <x-tabs :tabs="['Generals', 'SEO and Meta', 'Social media']" :uppercase="false">
                    <template #tab-0>
                        <div class="py-6">
                            generals
                        </div>
                    </template>
    
                    <template #tab-1>
                        <div class="py-6">
                            <section class="p-6">
                                <h3 class="m-0">
                                    Basic seo settings
                                </h3>
                                
                                <x-border color="gray" yt="0" yb="8" class="w-full" />
      
                                <form-seo />
                            </section>

                            <section class="p-6">
                                <h3 class="m-0">
                                    Meta tags                
                                </h3>
                                
                                <x-border color="gray" yt="0" yb="3" class="w-full" />
    
                                <form-meta />
                            </section>
                        </div>
                    </template>

                        
                    <template #tab-2>
                        <div class="py-6">
                            <h3 class="m-0">
                                Basic seo settings
                            </h3>

                            <x-border color="gray" yt="0"  class="w-full" />
                        </div>
                    </template>
    
                </x-tabs>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>