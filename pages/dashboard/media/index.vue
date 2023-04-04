<script setup>
import { storeToRefs } from 'pinia';
const { $mediaStore } = useNuxtApp()
const { media , pagination } = storeToRefs($mediaStore)
definePageMeta({
    layout: "authorization",
})

const loading = ref(false)
const page = ref(1)
const search = ref('')
const perPage = ref()
const orderBy = ref('createdAt')
const orderDir = ref('desc')

let isShowModalDialog = ref(false)
let isShowPreviewImage = ref(false)
let IsShowTable = ref(true)
let isShowModalPhotoDetails = ref(false)
let fileEdit = ref(null)
let isShowActions = ref(false)
let selectAll = ref(false)

const preview = ref({})

const actions =  ref([
    {action: "delete", label: "Delete"},
])

async function  getMedia () {
    loading.value = true

    try {
        await $mediaStore.getMedia(page.value, perPage.value)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

function closeModalDialog (event) {
    isShowModalDialog.value = event
}

onMounted(() => {
    getMedia()
})

watch(() => search.value, () => {
    setTimeout(() => {
        page.value = 1
        getMedia()
    }, 300)
})

watch(() => orderBy.value, () => {
    page.value = 1
    getMedia()
})

watch(() => orderDir.value, () => {
    page.value = 1
    getMedia()
})

function addedToLibrary (event) {
    getMedia()
}

function switchPage(event) {
    page.value = event
    getMedia()
}

function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    getMedia()
}

function toggleSelectAll(e) {
    media.value.data.forEach(file => file.selected = e.target.checked)
    
    showFieldAction()
}

function getPreviewImage(file) {
    preview.value = file
    isShowPreviewImage.value = true
}

function switchBetweenTablesPerTabs( ) {
    IsShowTable.value = !IsShowTable.value
}

function openEditFile(file) {
    fileEdit.value = file
    isShowModalPhotoDetails.value = true
}

function closeModalEdit(event) {
    isShowModalPhotoDetails.value = event
    fileEdit.value = null
}

async function deletedFile(fileId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        const deleteFile = await useFetchApi('/api/media/file', {
            method: 'DELETE',
            params: {
                id: fileId,
            }      
        })

        if(deleteFile) {
            getMedia()
        }
    }
}

async function executeAction(actionId) {
    const fileIds = media.value.data.filter(file => file.selected)
        .map(file => file.id);

    if (!actionId.length) return;

    switch (actionId) {
        case 'delete':
        if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
            fileIds.forEach(async (fileId) => {
                try {
                    
                    const deleteFile = await useFetchApi('/api/media/file', {
                        method: 'DELETE',
                        params: {
                            id: fileId, 
                        }      
                    })
        
                    if(deleteFile) {
                        isShowActions.value = false
                        selectAll.value = false
                        console.log(deleteFile)
                        getMedia()
                    }

                } catch (error) {
                    console.error(error)
                }
            })
        }
        break;
    }
}

function showFieldAction() {
    const isSelectedFile = media.value.data.filter(file => file.selected)

    if(isSelectedFile.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}
</script>

<template>
    <x-section-dashboard title="Media Library" :container="false">
        <template #header-panel>
            <!--
                <x-btn
                    class="h-9"
                    color="secondary-outline"
                    shadow
                    rounded
                    icon-left
                >
                    <template #icon-left>
                        <Icon name="material-symbols:create-new-folder" class="text-xl" />
                    </template>
    
                    Add new folder
                </x-btn>
            -->

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
            <div class="xl:p-10">
                <div class="w-full flex justify-between mb-8">
                    <div class="flex justify-center items-center space-x-3 ">
                        <div class="flex justify-center items-center space-x-3 ">
                            <div v-if="!IsShowTable">
                                <div class="w-6 text-center bg-black/30 p-3 rounded-xl">
                                    <input v-model="selectAll" type="checkbox" @change="toggleSelectAll" class="w-6 h-6 bg-background-light dark:bg-background-dark text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                                </div>
                            </div>

                            <select v-model="orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option value="createdAt">Uploading</option>
                                <option value="name">Alphabetically</option>
                                <option value="updatedAt">Updates</option>
                            </select>
    
                            <select v-model="orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option value="desc">Sort by descending</option>
                                <option value="asc">Sort by ascending</option>
                            </select>

                            <div >
                                <x-select-action :actions="actions" :isShowActions="isShowActions" @execute="executeAction" />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center items-center space-x-3">
                        <x-btn
                            @click="switchBetweenTablesPerTabs"
                            class="h-9 w-9"
                            :tooltip="{text: IsShowTable ? 'Grid preview':'List preview'}"
                            color="secondary-outline"
                            shadow
                            rounded
                            icon
                        >
                            <Icon v-if="IsShowTable" name="material-symbols:grid-view-rounded" class="text-xl" />
                            <Icon v-else name="material-symbols:view-list-rounded" class="text-xl" />
                        </x-btn>

                        <x-search v-model="search" icon />
                    </div>
                </div>

               <x-table
                    v-if="IsShowTable"
                    :head="['preview', 'name', 'size', 'created', 'last update', '' ]"
                    @select-all="toggleSelectAll"
                >
                
                    <x-table-body v-for="(file, index) in media?.data" :key="file.index = index">
                        <x-table-body-cell  justify="center">
                            <input v-model="file.selected" @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-blue-600 rounded border-gray-300 lg:w-4 lg:h-4 focus:ring-blue-500">
                        </x-table-body-cell>

                        <x-table-body-cell justify="center">
                            <x-photo-card-preview :file="file" />
                        </x-table-body-cell>

                        <x-table-body-cell>
                            {{ file.name }}
                        </x-table-body-cell>

                        <x-table-body-cell>
                            {{ file.size }} KB
                        </x-table-body-cell>

                        <x-table-body-cell>
                            {{ file.created_at }}
                        </x-table-body-cell>

                        <x-table-body-cell >
                            <div v-if="file.created_at !== file.updated_at">
                                {{ file.updated_at }}
                            </div>
                        </x-table-body-cell>

                        <x-table-body-cell justify="center">
                            <div class="w-full justify-center items-center">
                                <x-btn  @click="getPreviewImage(file)" color="secondary" icon strip :tooltip="{text: 'Preview'}" rounded>
                                    <Icon name="mdi:eye"  class="text-2xl"/>
                                </x-btn>

                                <x-btn
                                    @click="openEditFile(file)"
                                    class="h-9 w-9"
                                    :tooltip="{text: 'Edit'}"
                                    color="secondary"
                                    strip
                                    rounded
                                    icon
                                >
                                    <Icon name="material-symbols:edit" class="text-xl" />
                                </x-btn>

                                <x-btn  @click="deletedFile(file.id)" color="danger" icon strip :tooltip="{text: 'Deleted'}" rounded>
                                    <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                </x-btn>
                            </div>
                        </x-table-body-cell>
                    </x-table-body>
                </x-table>

                <div v-else >                    
                    <div v-if="media" class="grid grid-cols-4 gap-6">
                        <x-photo-card
                          v-for="(file, index) in media?.data"
                          :key="file.index = index"
                          :file="file"
                          @showFieldAction="showFieldAction"
                        >
                            <template #selected>
                                <input v-model="file.selected"  @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                            </template>

                            <template #action>
                                <x-btn  @click="getPreviewImage(file)" color="secondary-outline" icon  :tooltip="{text: 'Preview'}" rounded>
                                    <Icon name="mdi:eye"  class="text-2xl"/>
                                </x-btn>

                                <x-btn
                                    @click="openEditFile(file)"
                                    class="h-9 w-9"
                                    :tooltip="{text: 'Edit'}"
                                    color="secondary-outline"
                                    rounded
                                    icon
                                >
                                    <Icon name="material-symbols:edit" class="text-xl" />
                                </x-btn>

                                
                                <x-btn
                                    :tooltip="{text: 'Deleted'}"
                                    class="h-9 w-9"
                                    @click="deletedFile(file.id)"
                                    color="danger-outline"
                                    icon
                                    rounded
                                >
                                    <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                </x-btn>
                            </template>
                        </x-photo-card>
                    </div>
                </div>

                <div v-if="media">
                    <x-pagination :count="media.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                </div>
                
                <x-modal-photo-dropzone
                    :show="isShowModalDialog"
                    @close="closeModalDialog"
                    @addedToLibrary="addedToLibrary"
                    title="Add new assets"
                />

                <x-modal-photo-details
                    :show="isShowModalPhotoDetails"
                    :file="fileEdit"
                    @close="closeModalEdit"
                    @addedToLibrary="addedToLibrary"
                    title="Add new assets"
                />

                <div v-if="media && preview">
                    <x-photo-preview
                        :isShowPreviewImage="isShowPreviewImage"
                        :photos="media.data"
                        :preview="preview"
                        @close="event => isShowPreviewImage = event"
                        @preview="event => preview = event"
                    />
                </div>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>