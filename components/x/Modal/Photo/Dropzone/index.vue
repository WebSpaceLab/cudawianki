<script setup>
const emits = defineEmits(['close', 'addedToLibrary']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '3xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: 'Add new assets'
    }
});

const close = () => {
    emits('close');
};
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
        <x-tabs :tabs="['from computer', 'from url']">
            <template #tab-0>
                <div class="py-6">
                    <x-photo-dropzone @addedToLibrary="emits('addedToLibrary', event)" />
                </div>
            </template>

            <template #tab-1>
                <div>
                    <x-photo-from-url />
                </div>
            </template>

        </x-tabs>
    </x-modal-dialog>
</template>