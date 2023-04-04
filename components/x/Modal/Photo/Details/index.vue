<script setup>
const { $mediaStore } = useNuxtApp()

const emits = defineEmits(['close', 'addedToLibrary']);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '4xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    file: {
        type: Object
    },
    title: {
        type: String,
        default: 'Photo details'
    }
});

const loading = ref(false)
const disabled = ref(true)
const error = ref(null)

const fileEdit = ref({
    name: '',
    description: ''
})

const close = () => {
    

    emits('close')
}


async function updated () {
    loading.value = true

    await $mediaStore.updatedMedia(props.file.id, {
        id: props.file.id,
        name: fileEdit.value.name,
        description: fileEdit.value.description,
    }).then(({data}) => {
        fileEdit.value = data.media
        emits('addedToLibrary', data.media)
    }).catch((error) => {
        error.value = 'Uploaded Fail. Please try again later.';

        if (error?.response.status === 422) {
            error.value = error.response.data.errors.file[0];
        }
    }).finally(() => {
        loading.value = false
        error.value = null
        disabled.value = true

        close()
    })

}

watch(() => props.file, (file) => {
    fileEdit.value.name = file?.name
    fileEdit.value.description = file?.description
})

watch(() => fileEdit.value.name, () => {
    disabled.value = false
})

watch(() => fileEdit.value.description, () => {
    disabled.value = false
})
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
       <div class="w-full h-full flex flex-row justify-center items-start space-x-6">
         <div >
            <x-photo-card :file="file" :isFieldSelected="false" >
                <template #action>

                </template>
            </x-photo-card>
         </div>

         <div class="w-full h-full flex flex-col justify-center space-y-6 py-6">
            <div class="w-full p-6 box-border grid grid-cols-2 gap-4 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg">
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase  m-0  text-white drk:text-black text-bold">Size</p>  {{ file.size }}
                </span>

                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold ">Dimensions</p>  
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Date</p>  {{ file.createdAt  }}
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Mime-Type</p> {{ file.mime_type }}
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Asset ID</p>  {{ file.id }}
                </span>
            </div>

            <div class="flex flex-col space-y-6">
                <div>
                    <x-input v-model="fileEdit.name" label="Name" color="blue" >

                    </x-input>
                </div>

                <div>
                    <x-textarea v-model="fileEdit.description" label="Description" color="blue" :rows="5" :cols="20" >

                    </x-textarea>
                </div>
            </div>
         </div>
       </div> 

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="updated" @keydown.enter="updated" type="submit" color="primary-outline" rounded :loading="loading" :disabled="disabled">Update</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>