<script setup>
import axios from '~/plugins/axios'

const {$mediaStore, $flash } = useNuxtApp()
const $axios = axios().provide.axios

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
const SwitchFile = ref()
const fileEdit = ref({})
const media = ref([

])

const close = () => {
    emits('close', false)
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

function onSelectedFiles($event) {
    let files2 = [...$event.target.files]

    uploadFile(files2)
    
    SwitchFile.value = null
}

function uploadFile(files) {
 
    files.forEach(file => {
        media.value.unshift({
            file: file,
            progress: 0,
            error: null,
            uploaded: false,
            preview_url: '',
        });
    });

    
    media.value
        .filter(media => !media.uploaded)
        .forEach(async media => {
            let form = new FormData;

            form.append('file', media.file)

            $axios.post(`/api/media/${ fileEdit.value.id }/update-file`, form, {
                onUploadProgress: (event) => {
                    media.progress = Math.round(event.loaded * 100 / event.total);
                },
            })
            .then(({data}) => {
                emits('addedToLibrary', data.file)

                media.uploaded = true;
                media.id = data.file.id;
                media.preview_url = data.file.preview_url;
                fileEdit.value = data.file
                $flash.success(data.flash.message)
            })
            .catch(error => {
                media.error = 'Uploaded Fail. Please try again later;';
                if (error?.response.status === 422) {
                    media.error = error.response.data.errors.file[0];
                }
                
                $flash.error(media.error)
            })
        })
    ;
}


watch(() => props.file, (file) => {
    fileEdit.value = file
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
            <x-photo-card :file="fileEdit" :isFieldSelected="false" >
                <template #action>
                    <label class=" px-2 h-9 inline-flex items-center rounded-xl border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <Icon name="material-symbols:cameraswitch-sharp"  class="text-2xl"/>

                        <input ref="SwitchFile" @input="onSelectedFiles" type="file" name="SwitchFile"  class="sr-only">
                    </label>
                </template>
            </x-photo-card>
            
            <template v-for="(item, index) in media" :key="index" >
                <div v-if="!item.uploaded && !item.error" class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
    
                    <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${item.progress}%`"></div>
    
                    <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ item.progress }}%</div>
    
                </div>
    
                <div v-if="item.error" class="relative text-xs lg:text-md text-red-600">{{ item.error }}</div>
            </template>
         </div>

         <div class="w-full h-full flex flex-col justify-center space-y-6 py-6">
            <div class="w-full p-6 box-border grid grid-cols-2 gap-4 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg">
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase  m-0  text-white drk:text-black text-bold">Size</p>  {{ fileEdit.size }}
                </span>

                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold ">Dimensions</p>  
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Date</p>  {{ fileEdit.created_at  }}
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Mime-Type</p> {{ fileEdit.mime_type }}
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Asset ID</p>  {{ fileEdit.id }}
                </span>
            </div>

            <div class="flex flex-col space-y-6">
                <div>
                    <x-input v-model="fileEdit.name" label="Name" color="blue" />
                </div>

                <div>
                    <x-textarea v-model="fileEdit.description" label="Description" color="blue" :rows="5" :cols="20" />
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