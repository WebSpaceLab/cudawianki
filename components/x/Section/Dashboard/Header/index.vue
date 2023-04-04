<script setup>
let props = defineProps({
    title: String,
    to: String,
});

</script>

<template>
    <header class="relative  w-full flex justify-between items-center px-6 box-border rounded-xl">
        <div class="h-full flex flex-row flex-wrap justify-center items-center">
            <h2 class="font-semibold text-3xl text-base-color dark:text-base-dark leading-tight">
               <NuxtLink :to="to" class=" text-base-color dark:text-base-dark" :class="[to ? 'hover:text-hover hover:underline hover:underline-offset-2' : ' cursor-default']">{{ title }}</NuxtLink>
            </h2>

            <slot name="header"></slot>
        </div>

        <div class="h-full flex justify-center items-center px-3 py-2 rounded-lg  space-x-3">
            <slot name="panel"/>
        </div>
    </header>
</template>