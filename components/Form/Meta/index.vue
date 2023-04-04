<script setup>
const form = ref({
    name: 'description',
    content: '',
    charset: 'none',
    http_equiv: 'none'
})

const allName = computed(() => {
    return [
        { value: 'application-name', label: 'application-name' },
        { value: 'author', label: 'author' },
        { value: 'description', label: 'description' },
        { value: 'generator', label: 'generator' },
        { value: 'keywords', label: 'keywords' },
        { value: 'viewport', label: 'viewport' },
    ]
})

const allCharset = computed(() => {
    return [
        { value: 'none', label: 'none' },
        { value: 'character_set', label: 'character_set' },
    ]
})

const allHttpEquiv = computed(() => {
    return [
        { value: 'none', label: 'none' },
        { value: 'content-security-policy', label: 'content-security-policy' },
        { value: 'content-type', label: 'content-type' },
        { value: 'default-style', label: 'default-style' },
        { value: 'refresh', label: 'refresh' },
    ]
})
</script>

<template>
    <div class="w-full flex flex-col justify-start items-start space-y-6">
        <x-adding-fields >
            <div class="w-full flex flex-col justify-start items-start space-y-6">
                <div class="w-full flex justify-between items-center space-x-6 mb-3">
                    <div class="w-full flex flex-col ">
                        <label class="w-full" for="meta_name">Meta name</label>
    
                        <select v-model="form.name" aria-label="Meta name" id="meta_name" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="item in allName" :key="item.value" :value="item.value">{{ item.label }}</option>
                        </select>
                    </div>
        
                    <div class="w-full flex flex-col ">
                        <label class="w-full" for="meta_name">Meta name</label>
    
                        <select v-model="form.charset" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="item in allCharset" :key="item.value" :value="item.value">{{ item.label }}</option>
                        </select>
                    </div>
        
                    <div class="w-full flex flex-col ">
                        <label class="w-full" for="meta_name">Meta name</label>
    
                        <select v-model="form.http_equiv" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="item in allHttpEquiv" :key="item.value" :value="item.value">{{ item.label }}</option>
                        </select>
                    </div>
                </div>
    
                <div class="w-full">
                    <x-textarea v-model="form.content" label="Site Description" :rows="3" />
                </div>
            </div>
        </x-adding-fields>
    </div>
</template>