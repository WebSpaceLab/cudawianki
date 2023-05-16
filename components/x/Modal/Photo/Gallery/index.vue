<script setup>
const emits = defineEmits(['close', 'addedToLibrary']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '7xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: 'Add new assets'
    },
    minimization: {
        type: Boolean,
        default: false
    },
    multiple: Boolean
});

const close = (event) => {
    emits('close', event);
};

const addedToLibrary = (event) => {
    if(event) {
        emits('addedToLibrary', event);
    }
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
        :minimization="minimization"
    >
        <x-tabs :tabs="['library', 'add from assets']">
            
            <template #tab-0>
                <x-section-gallery  @addedToLibrary="addedToLibrary" @close="close" :multiple="multiple" />
            </template>
            
            <template #tab-1>
                <div class="py-6">
                    <x-photo-dropzone @addedToLibrary="addedToLibrary" :multiple="multiple"/>
                </div>
            </template>
        </x-tabs>
    </x-modal-dialog>
</template>