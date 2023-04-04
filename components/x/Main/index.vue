<script setup>
const props = defineProps({
    isShowSidebar: {
        type: Boolean,
        default: false,
    },
    isRailSidebar: {
        type: Boolean,
        default: false,
    }
});

</script>

<template>
    <main
        class="relative w-full duration-300 px-8"
        :class="[
            isShowSidebar ?
                isRailSidebar ? 'is-rail-sidebar' : 'is-show-sidebar'
                : '',

        ]"
    >
        <slot />
    </main>
</template>

<style lang="scss" scoped>
.is-show-sidebar {
    width: calc(100% - 250px);
}

.is-rail-sidebar {
    width: calc(100% - 60px);
}
</style>