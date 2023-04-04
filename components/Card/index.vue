<script setup>
const props = defineProps({
    item: Object,
})

const emit = defineEmits(['hover'])

const { classTextColor } = useClassColor()

let isHover = ref(false)

watch(() => isHover.value, (hover) => {
    emit('hover', { id: props.item.id, hover })
})
</script>

<template>
    <!-- ====== CardStart -->
    <x-link
        :to="{ path : item.path }"
        @mouseleave="isHover = false"
        @mouseover="isHover = true"
        :class="isHover ? 'shadow-2xl shadow-black transition-all duration-200 ease-in' : 'transition-all duration-200 ease-out'"
        class="relative w-full h-full rounded-lg z-10 shadow-lg shadow-slate-700"
    >
        <div class="w-full h-full rounded-lg overflow-hidden">
            <img class="rounded-lg w-full h-full object-cover" :class="isHover ? 'scale-110 transition-all duration-200 ease-in' : 'scale-100 transition-all duration-200 ease-in'" :src="item.image.src" :alt="item.image.alt" />
        </div>

        <span
            :class="isHover ? 'h-[90%] rounded-lg' : ''"
            class="w-[90%] absolute left-[5%]  bottom-[5%] box-border px-5 pt-1 pb-2 bg-black/60 z-10 overflow-hidden"
        >
            <!--
                <div class="flex justify-between">
                    <p class="uppercase text-xs" :class="classTextColor('green')">item.name</p>
                    <span class="text-xs text-info">
                        <i class="far fa-clock"></i>
                        item.data
                    </span>
                </div>

                <x-border yt="0" yb="2" color="green" />
            -->


            <p class="sm:text-xs md:text-sm lg:text-xl text-bold text-center text-white">
                {{ item.title }}
            </p>

            <x-border v-if="isHover" yt="2" yb="2" color="blue" />

            <transition
                enter-active-class="transition ease-in duration-500"
                enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="transform opacity-100"
                leave-to-class="transform opacity-0"
            >
                <div v-if="isHover" class="w-full">
                    <!---
                        <p class="text-white text-sm">Opis:</p>
                    -->

                    <p class="text-white text-sm" v-html="item.description"></p>
                </div>
            </transition>
        </span>
        <slot name="decoration"></slot>
    </x-link>
<!-- ====== Card End -->
</template>