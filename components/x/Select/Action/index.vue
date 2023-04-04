<script setup>
const props = defineProps({
    actions: Array,
    isShowActions: Boolean
});


const emits = defineEmits([
    'execute'
]);

const actionId = ref(null);
</script>

<template>
    <div v-if="actions && isShowActions" class="space-x-2 flex justify-center items-center">
      <template v-for="(action, index) in actions" :key="index">
        <x-btn @click="$emit('execute', action.action)" :color="action.action === 'delete' ? 'danger-outline' : 'primary-outline'" class="inline-flex items-center px-4 h-9 font-medium text-sky-300 bg-sky-600 rounded-lg border border-sky-300 shadow-sm lg:text-sm hover:bg-sky-800 hover:text-sky-100 hover:border-sky-100">
            {{ action.label }}
        </x-btn>

      </template>
    </div>
</template>