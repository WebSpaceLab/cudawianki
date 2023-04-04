<script setup>
const emits = defineEmits([

])

const props = defineProps({
    data: {
        type: Array
    }
})

const items = ref([])

let loading = ref(false)

function addingField () {
    loading.value = true
    const item = {}
    items.value.push(item)

    loading.value = false
}
</script>

<template>
    <div  class="w-full flex flex-col space-y-3 px-6 box-border">
        <div v-for="(item, index) in items" :key="index" class="w-full">
            <x-border color="gray" mt="0" mb="3"/>
            
            <div class="w-full px-6 box-border">
                <slot></slot>
            </div>
    
            <x-border color="gray"  mt="3" mb="0" />
        </div>

        <div class="w-full">
            <x-btn @click="addingField()" class="w-full bg-slate-600/50 border-slate-600/50 text-background-dark" rounded icon-left :icon-right="loading">
                <template #icon-left>
                    <Icon name="material-symbols:add-circle" class="text-2xl text-background-dark"/>
                </template>

                Adding more fields

                <template #icon-right>
                    <Icon v-if="loading" name="svg-spinners:bars-rotate-fade" class="text-2xl text-background-dark"/>
                </template>
            </x-btn>
        </div>
    </div>
</template>