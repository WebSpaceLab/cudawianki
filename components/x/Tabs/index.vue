<script setup>
const props = defineProps({
    tabs: Array,
    uppercase : {
        type: Boolean,
        default: true
    }
})

let active = ref(0)
let buffer = ref(null)

function switchTab(index) {
    if(!active) {
        buffer.value = null
    } else {
        buffer.value = active.value
    }

    
    active.value = index
    console.log('buffer: ' + buffer.value, 'active: ' + active.value)
}
</script>

<template>
    <div class="w-full">
        <div class="h-full flex justify-start items-end space-x-3 border-b-solid border-slate-900 ">
            <span
                v-for="(tab, index) in tabs " :key="index"
                @click="switchTab(index)"
                class="min-w-30 text-center text-sm text-bold cursor-pointer px-3 py-2 border-b-solid "
                :class="[
                    active === index ? 'text-active-800 dark:text-active-400 border-active-800 dark:border-active-400 ' : 'text-slate-700 dark:text-slate-600 border-slate-700 dark:border-slate-600 dark:hover:text-hover-600 dark:hover:text-hover-200 dark:hover:border-hover-600 dark:hover:border-hover-200',
                    uppercase ? 'uppercase' : ''
                ]"
            >
                 {{ tab }}
             </span>
        </div>

        <div class="w-full relative">
            <template v-for="(tab, index) in tabs " :key="index">
                <transition
                    enter-active-class="ease duration-500"
                    :enter-from-class="`opacity-0 translate-x-[${active > buffer ? '-100%' : '100%' }] blur-200`"
                    enter-to-class="opacity-100 translate-x-0 blur-0"
                    leave-active-class="ease duration-500"
                    leave-from-class="opacity-100 translate-x-0 blur-0"
                    :leave-to-class="`opacity-0 translate-x-[${active > buffer ? '100%' : '-100%' }] blur-200`"
                >
                    <div v-if="index === active" class="w-full ">
        
                        <slot :name="`tab-${index}`"></slot>
                    </div>
                </transition>
            </template>
        </div>
    </div>

    
</template>