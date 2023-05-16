<script setup>
definePageMeta({
    layout: "authorization",
})

const router = useRouter()

const { $mediaStore, $offers } = useNuxtApp()

const form = reactive({
    title: '',
    description: '',
    transition: 'fade-up',
    media_id: null,
    status: false,
    offer: {}
})

const errors = ref()
let isSwitch = ref(false);

const previewImage = ref({
    preview_url: '/no-image-icon.png',
    name: 'No image'
})

const isShowPreviewImage = ref(false)

const isShowModalDialog = ref(false)
const isShowModalPhotoGallery = ref(false)

const isShowModalPhotoDetails = ref(false)


const addedToLibrary = (event) => {
    if(event) {
        previewImage.value = event
        form.media_id = previewImage.value.id
    }

    closeModalDialog(false)
}

function closeModalDialog (event) {
    isShowModalDialog.value = event
}

async function deletedPreviewImage(mediaId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {
            await $mediaStore.deletedMedia(mediaId)

            resetPreviewImage()
        } catch (error) {
            console.error(error)
        }
    }
}

function openEditPreviewImage(file) {
    previewImage.value = file
    isShowModalPhotoDetails.value = true
}

function closeModalEdit(event) {
    isShowModalPhotoDetails.value = event
}

function closeModalPhotoGallery(event) {
    isShowModalPhotoGallery.value = event
}

function resetPreviewImage() {
    previewImage.value = {
        preview_url: '/no-image-icon.png',
        name: 'No image'
    }
}

const onSubmit = async () => {
    errors.value = null

    await $offers.addOffer(form).then((data) => {
        cancel()
    }).catch(err => {
        errors.value = err.response.data.errors
    })
}

const cancel = () => {
    router.back()
}
</script>

<template>
    <x-section-dashboard :container="false">
        <template #header-panel>
            <x-btn
                @click="isShowModalPhotoGallery = true"
                class="h-9"
                color="secondary-outline"
                shadow
                rounded
                icon-left
            >
                <template #icon-left>
                    <Icon name="material-symbols:attach-file-add-rounded" class="text-xl" />
                </template>

                Add Image from media
            </x-btn>


            <x-btn
                @click="isShowModalDialog = true"
                class="h-9"
                color="secondary-outline"
                shadow
                rounded
                icon-left
            >
                <template #icon-left>
                    <Icon name="material-symbols:attach-file-add-rounded" class="text-xl" />
                </template>

                Add new assets
            </x-btn>
        </template>

        <template #main>
            <div>
                <div class="w-100 h-full container mx-auto p-8 flex flex-col justify-center items-center space-y-5">
                    <div class="w-full">
                        <x-photo-card
                            :file="previewImage"
                        >
                            <template #action>
                                <x-btn v-if="previewImage.id" @click="isShowPreviewImage = true" color="secondary-outline" icon  :tooltip="{text: 'Preview'}" rounded>
                                    <Icon name="mdi:eye"  class="text-2xl"/>
                                </x-btn>
        
                                <x-btn
                                    v-if="previewImage.id"
                                    @click="openEditPreviewImage(previewImage)"
                                    class="h-9 w-9"
                                    :tooltip="{text: 'Edit'}"
                                    color="secondary-outline"
                                    rounded
                                    icon
                                >
                                    <Icon name="material-symbols:edit" class="text-xl" />
                                </x-btn>
        
                                
                                <x-btn
                                    v-if="previewImage.id"
                                    :tooltip="{text: 'Deleted'}"
                                    class="h-9 w-9"
                                    @click="deletedPreviewImage(previewImage.id)"
                                    color="danger-outline"
                                    icon
                                    rounded
                                >
                                    <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                </x-btn>
                            </template>
                        </x-photo-card>

                        <p v-if="errors && errors.media_id " class="text-sm text-error-600 m-0 ">{{ errors.media_id[0] }}</p>
                    </div>

                    
                    <div class="flex flex-row justify-center items-center w-full h-9 mb-6">
                        <div class="w-1/3 h-full">
                            <div class="flex w-full justify-start items-center ">
                                <span v-if="isSwitch" class="mr-3 text-sm font-medium text-green-500">Status</span>
                                <span v-else class="mr-3 text-sm font-medium text-red-500">Status</span>
    
                                <label for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input @click="isSwitch = !isSwitch" v-model="form.status" type="checkbox" :value="isSwitch" id="toggle-social-create" class="sr-only peer" checked>
                                    
                                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
    
                            <p v-if="errors && errors.status " class="text-sm text-error-600 m-0 ">{{ errors.status[0] }}</p>
                        </div>

                        <div class="w-2/3 h-full flex justify-center items-center mb-6">
                            <x-select-transition
                                v-model="form.transition"
                                :error="errors && errors.transition ? errors.transition[0]: ''"
                            />
                        </div>
        
                    </div>
    
    
                    <div class="w-full">
                        <x-input
                            v-model="form.title"
                            color="blue"
                            label="Title"
                            :error="errors && errors.title ? errors.title[0]: ''"
                        />
      
                    </div>

                    <div class="w-full">
                        
                        <div class="flex w-full justify-start items-center space-x-4">
                            <x-textarea
                                v-model="form.description"
                                label="Description"
                                :error="errors && errors.description ? errors.description[0] : ''"
                                :rows="5"
                            />
                        </div>
                    </div>


                    <div class="w-full flex justify-between items-center">
                        <x-btn
                            @click="cancel()"
                            @keydown.esc="cancel()"
                            class="h-9"
                            color="secondary-outline"
                            shadow
                            rounded
                        >
                            Cancel
                        </x-btn> 

                        <x-btn
                            @click.prevent="onSubmit()"
                            @keydown.enter="onSubmit()"
                            class="h-9"
                            color="secondary-outline"
                            shadow
                            rounded
                            icon-left
                        >
                            Add offer
                        </x-btn>            
                    </div>
                </div>
            </div>

            <x-modal-photo-dropzone
                :show="isShowModalDialog"
                @close="closeModalDialog"
                @addedToLibrary="addedToLibrary"
                title="Add new assets"
                :multiple="false"
            />

            
            <x-modal-photo-gallery
                :show="isShowModalPhotoGallery"
                @close="closeModalPhotoGallery"
                @addedToLibrary="addedToLibrary"
                max-width="max"
                title="Gallery"
                :multiple="false"
            />

            <x-modal-photo-details
                :show="isShowModalPhotoDetails"
                :file="previewImage"
                @close="closeModalEdit"
                @addedToLibrary="addedToLibrary"
                title="Add new assets"
            />

            <div v-if="previewImage">
                <x-photo-preview
                    :isShowPreviewImage="isShowPreviewImage"
                    :preview="previewImage"
                    :photos="[previewImage]"
                    @close="event => isShowPreviewImage = event"
                />
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>