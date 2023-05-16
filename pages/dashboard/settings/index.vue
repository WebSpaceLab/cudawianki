<script setup>
import { storeToRefs } from 'pinia'

definePageMeta({
    layout: "authorization",
})
const { $metaStore, $contact } = useNuxtApp()
const { meta } = storeToRefs($metaStore)

const isShowContactCreate = ref(false)
const isShowContactUpdate = ref(false)
const isShowFooter = ref(true)

const form = ref({
    name: 'keywords',
    content: ''
})

const allName = computed(() => {
    return [
        { value: '', label: 'none' },
        { value: 'application-name', label: 'application-name' },
        { value: 'author', label: 'author' },
        // { value: 'description', label: 'description' },
        { value: 'generator', label: 'generator' },
        // { value: 'keywords', label: 'keywords' },
        { value: 'viewport', label: 'viewport' },
    ]
})


const allCharset = computed(() => {
    return [
        { value: null, label: 'none' },
        { value: 'character_set', label: 'character_set' },
    ]
})

const allHttpEquiv = computed(() => {
    return [
        { value: null, label: 'none' },
        { value: 'content-security-policy', label: 'content-security-policy' },
        { value: 'content-type', label: 'content-type' },
        { value: 'default-style', label: 'default-style' },
        { value: 'refresh', label: 'refresh' },
    ]
})

async function createdKeywords( content) {
    await $metaStore.createdMetaTag(form.value).then(([data]) => {
        if(data) {
            $metaStore.getMetaTags()
        }
    }).catch((error) => {
        console.log(error)
    })
}

async function updateKeywords(id, content) {
    await $metaStore.updatedMetaTag(id, {
        name: 'keywords',
        content: content
    }).then(([data]) => {
        if(data) {
            $metaStore.getMetaTags()
        }
    }).catch((error) => {
        console.log(error)
    })
}

async function update(id, name, content) {
    await $metaStore.updatedMetaTag(id, {
        name: name,
        content: content
    }).then(([data]) => {
        if(data) {
            $metaStore.getMetaTags()
        }
    }).catch((error) => {
        console.log(error)
    })
}

async function deletedMetaTag(id) {
    if (confirm(`Czy na pewno chcesz usunąć ten meta tag?`)) {
        await $metaStore.deletedMetaTag(id)
        .then(({data}) => {
            if(data) {
                $metaStore.getMetaTags()
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>

<template>
    <x-section-dashboard title="Settings" :container="false">
        <template #header-panel>
            
        </template>

        <template #main>
            <div class="w-full container mx-auto">
                <x-tabs :tabs="['Generals', 'Meta Tags', 'Social media']" :uppercase="false">
                    <template #tab-0>
                        <section class="p-6">
                            <div class="p-4 bg-prime-light dark:bg-prime-dark rounded-b-xl hover:shadow-xl hover:shadow-black">

                                <h3 class="m-0">
                                    Basic settings
                                </h3>
                                
                                <x-border color="gray" yt="0" yb="8" class="w-full" />
    
                                <form-general />
                            </div>
                        </section>

                        <section class="p-6">
                            <div class="p-4 bg-prime-light dark:bg-prime-dark rounded-b-xl hover:shadow-xl hover:shadow-black">
                                <header class="flex flex-col mb-6 z-20">
                                    <h3 class="m-0 flex items-end space-x-4">
                                        <span> 
                                            <span v-if="isShowFooter">
                                                Footer
                                            </span>
                                            
                                            <span v-else>
                                                Contact
                                            </span>
                                            
                                            information
                                        </span>
                                    </h3>
                                    
                                    <x-border color="gray" yt="0" yb="0" class="w-full" />
                                    
                                    <div class="w-full h-10 flex justify-end items-center px-1 box-border space-x-3">
                                        <x-btn
                                            :tooltip="{text: isShowFooter ? 'change the view to footer information' : 'change the view to contact information'}"
                                            @click="isShowFooter = !isShowFooter"
                                            class="z-30"
                                            color="primary-outline"
                                            icon
                                            rounded
                                            shadow
                                        >
                                            <Icon name="material-symbols:cameraswitch-outline-sharp" class="text-xl" />
                                        </x-btn>
                                        
                                        <x-btn
                                            v-if="!$contact.title && !$contact.description && !$contact.address && !$contact.openingHours && !$contact.phone && !$contact.map"
                                            :tooltip="{text: 'create'}"
                                            @click="isShowContactCreate = !isShowContactCreate"
                                            color="primary-outline"
                                            icon
                                            rounded
                                        >
                                            <Icon name="material-symbols:add-circle" class="text-xl" />
                                        </x-btn>

                                        <x-btn
                                            v-else
                                            :tooltip="{text: 'update'}"
                                            @click="isShowContactUpdate = true"
                                            color="primary-outline"
                                            icon
                                            rounded
                                        >
                                            <Icon name="material-symbols:sync-rounded" class="text-xl" />
                                        </x-btn>
                                    </div>
                                </header>
                                    
                                <div> 
                                    <div v-if="!$contact.title && !$contact.description && !$contact.address && !$contact.openingHours && !$contact.phone && !$contact.map" class="w-full flex justify-center items-center">
                                        <p class="text-xl text-muted-light dark:text-muted-dark">
                                            Complete the footer and contact details
                                        </p>
                                    </div>

                                    <div class="p-10 box-border" v-else> 
                                        <transition
                                            enter-active-class="transition ease-in duration-500"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                        >
                                            <Footer v-if="isShowFooter" />

                                            <section-contact v-else />
                                        </transition>
                                    </div>
                                </div>
                            </div>

                            <x-modal-contact-information-create :show="isShowContactCreate" title="Footer and Contact information created"  @close="event => isShowContactCreate = event " />
                            <x-modal-contact-information-update :show="isShowContactUpdate" title="Footer and Contact information updated"  @close="event => isShowContactUpdate = event " />
                        </section>
                    </template>
    
                    <template #tab-1>    
                        <section class="p-6">
                            <div v-if="!meta?.name"  class="flex flex-col space-y-6 bg-prime-light dark:bg-prime-dark hover:shadow-xl hover:shadow-black transition-all duration-300 p-4 mb-6 rounded-b-xl">
                                <span class="m-0">
                                    <h3 class="p-0 m-0 ml-3"> Site keywords </h3>
                                    <x-border color="gray" yt="0" yb="0" class="w-full" />
                                </span>
                                
                                <div  class="px-6 box-border" >
                                    <div  class="w-full flex flex-col justify-start items-start space-y-4">
                                        <x-textarea v-model="form.content" label="Site keywords" />
                                    </div>
                                </div>

                                <div  class="w-full flex justify-end px-6 box-border">
                                    
                                    <x-btn  @click.prevent="createdKeywords()" color="primary-outline" shadow rounded >Create</x-btn>
                                </div>
                            </div>

                            <template v-for="(item, index) in meta" :key="index">
                                <div v-if="item.name === 'keywords'" class="flex flex-col space-y-6 bg-prime-light dark:bg-prime-dark hover:shadow-xl hover:shadow-black transition-all duration-300 p-4 mb-6 rounded-b-xl">
                                    <span class="m-0">
                                        <h3 class="p-0 m-0 ml-3"> Site {{ item.name }}</h3>
                                        <x-border color="gray" yt="0" yb="0" class="w-full" />
                                    </span>
                                    
                                    <div  class="px-6 box-border" >
                                        <div  class="w-full flex flex-col justify-start items-start space-y-4">
                                            <x-textarea v-model="item.content" label="Site keywords" />
                                        </div>
                                    </div>

                                    <div  class="w-full flex justify-end px-6 box-border">
                                        <x-btn v-if="item.content" @click.prevent="updateKeywords(item.id, item.content)" color="primary-outline" shadow  rounded >Update</x-btn>
                                    </div>
                                </div>
                            </template>

                            <template v-for="(item, index) in meta" :key="index">
                                <h3 v-if="item.name !== 'keywords'" class="m-0">
                                    Other meta tags
                                    <x-border color="gray" yt="0" yb="0" class="w-full" />
                                </h3>
                            </template>

                            <div v-if="meta.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                                <template v-for="(item, index) in meta" :key="index">
                                    <transition
                                        enter-active-class="transition ease-in duration-500"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-800"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <div v-if="item.name !== 'keywords'" class="flex flex-col space-y-6 bg-prime-light dark:bg-prime-dark p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-black">
                                            <div class="w-full flex flex-col justify-between items-center space-y-6 mb-3">
                                                <div class="w-full flex flex-col ">
                                                    <label class="w-full" for="meta_name">Meta name</label>
                                
                                                    <select v-model="item.name" aria-label="Meta name" id="meta_name" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                                        <option v-for="i in allName" :key="i.value" :value="i.value">{{ i.label }}</option>
                                                    </select>
                                                </div>
                                                
                                                <div class="w-full flex flex-col ">
                                                    <label class="w-full" for="meta_name">Meta charset</label>
                                
                                                    <select v-model="item.charset" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                                        <option v-for="i in allCharset" :key="i.value" :value="i.value">{{ i.label }}</option>
                                                    </select>
                                                </div>
                                    
                                                <div class="w-full flex flex-col ">
                                                    <label class="w-full" for="meta_name">Meta http_equiv</label>
                                
                                                    <select v-model="item.http_equiv" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                                        <option v-for="i in allHttpEquiv" :key="i.value" :value="i.value">{{ i.label }}</option>
                                                    </select>
                                                </div>

                                                <div  class="w-full flex flex-col justify-start items-start space-y-4">
                                                    <x-textarea v-model="item.content" label="Site Description" />
                                                </div>
                                            </div>

                                            <div  class="w-full flex justify-end space-x-4">
                                                <x-btn v-if="item.content" @click.prevent="deletedMetaTag(item.id)" color="danger-outline" shadow  rounded >Deleted</x-btn>
                                                <x-btn v-if="item.content" @click.prevent="update(item.id, item.name, item.content)" color="primary-outline" shadow  rounded >Update</x-btn>
                                            </div>
                                        </div>
                                    </transition>
                                </template>
                            </div>

                            <div >
                                <x-border color="gray" yb="0" class="w-full mb-2" />
    
                                <form-meta  />
                            </div>
                        </section>
                    
                    </template>

                        
                    <template #tab-2>
                        <div class="py-6">
                            <section-social />
                        </div>
                    </template>
    
                </x-tabs>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>