<script setup>
import { storeToRefs } from 'pinia';

// const router = useRouter()
const { $categories } = useNuxtApp()
const { categories , pagination,  months, queryParams  } = storeToRefs($categories)

definePageMeta({
    layout: "authorization",
})

let isHoverCard = ref({
    id: 0 , hover: true
})

function hoverCard(event) {
    isHoverCard.value = event
}

const loading = ref(false)
const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    month: queryParams.value.month ? queryParams.value.month :  null
})

const perPage = ref()
const orderBy = ref('created_at')
const orderDir = ref('desc')
const previewCategory = ref({})

let isShowModalPhotoGallery = ref(false)
let isShowModalCategoryEdit = ref(false)
let isShowModalCategoryPreview = ref(false)
let isShowActions = ref(false)
let selectAll = ref(false)

const actions =  ref([
    {action: "delete", label: "Delete"},
])



const allMonths = computed(() => {
    return [
        {value: null, label: 'Any date'},
        ...months.value,
    ];
}) 

async function  getCategories () {
    loading.value = true

    try {
        await $categories.getCategories(page.value, perPage.value, query.value.month, query.value.term, orderBy.value, orderDir.value )
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

function openPhotosGallery(category) {
    previewCategory.value = category
    isShowModalPhotoGallery.value = true
}

function closeModalPhotoGallery(event) {
    isShowModalPhotoGallery.value = event
}

const addPhotosToCategory = async (event) => {
    if(event) {    
        await $categories.addPhotosToCategory(previewCategory.value.id, {photoIds: event})
    
        getCategories()
    }
}

onMounted(() => {
    getCategories()
})

watch(() => query.value.term, () => {
    setTimeout(() => {
        page.value = 1
        getCategories()
    }, 300)
})


watch(() => query.value.month, () => {
    setTimeout(() => {
        page.value = 1
        getCategories()
    }, 300)
})

watch(() => orderBy.value, () => {
    page.value = 1
    getCategories()
})

watch(() => orderDir.value, () => {
    page.value = 1
    getCategories()
})



function switchPage(event) {
    page.value = event
    getCategories()
}

function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    getCategories()
}

function toggleSelectAll(e) {
    categories.value.forEach(file => file.selected = e.target.checked)
    
    showFieldAction()
}

function openCategoryPreview(category) {
    previewCategory.value = category

    isShowModalCategoryPreview.value = true
}

async function deletedCategory(categoryId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {
            await $categories.deletedCategory(categoryId)
        } catch (error) {
            console.error(error)
        } finally {
            getCategories()
        }
    }
}

async function executeAction(actionId) {
    const categoriesId = categories.value.filter(category => category.selected)
        .map(file => file.id);

    if (!actionId.length) return;

    switch (actionId) {
        case 'delete':
        if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
            categoriesId.forEach(async (categoryId) => {
                try {
                    
                    const deletedCategory = await $categories.deletedCategory(categoryId)
        
                    if(deletedCategory) {
                        isShowActions.value = false
                        selectAll.value = false
                        getCategories()
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
    const isSelectedFile = offers.value.filter(file => file.selected)

    if(isSelectedFile.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}

function openEditCategory(category) {
    previewCategory.value = category
    isShowModalCategoryEdit.value = true
}

watch(() => categories.value, () => {
    const category = categories.value.filter((category) => category.id === previewCategory.value.id)

    if(category.length) {
        previewCategory.value = category[0]
    }
})
</script>

<template>
    <x-section-dashboard :container="false">
        <template #header-panel>
            <x-btn
                v-if="$offers.allOffers.length != 0"
                to="/dashboard/offers/categories/create"
                class="h-9 group"
                color="secondary-outline"
                shadow
                rounded
                icon-left
                link
            >
                <template #icon-left>
                    <Icon name="material-symbols:add-circle-rounded" class="text-xl text-secondary-400 group-hover:text-secondary-200" />
                </template>
                
                <span class="text-secondary-400 group-hover:text-secondary-200">
                    Add new category
                </span>
            </x-btn>
        </template>

        <template #main>
            <div v-if="$offers.allOffers.length == 0" class="w-full h-full flex justify-center items-center">
                <p class="text-xl text-bold text-center">
                    To create categories, you must first add offerte.
                </p>
            </div>

            <div v-else class="w-full h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
                <div class="w-full  flex justify-between mb-8">
                    <div class="flex justify-center items-center space-x-3 ">
                        <div class="flex justify-center items-center space-x-3 ">
                            <div>
                                <div class="w-6 text-center bg-black/30 p-3 rounded-xl">
                                    <input v-model="selectAll" type="checkbox" @change="toggleSelectAll" class="w-6 h-6 bg-background-light dark:bg-background-dark text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                                </div>
                            </div>

                            <select v-model="orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option value="created_at">Uploading</option>
                                <option value="name">Alphabetically</option>
                                <option value="updated_at">Updates</option>
                            </select>
    
                            <select v-model="orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option value="desc">Sort by descending</option>
                                <option value="asc">Sort by ascending</option>
                            </select>

                            <select v-model="query.month"  aria-label="Media date" id="date" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.label }}</option>
                            </select>

                            <div >
                                <x-select-action :actions="actions" :isShowActions="isShowActions" @execute="executeAction" />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center items-center space-x-3">
                        <x-search v-model="query.term" icon />
                    </div>
                </div>


                <div class="w-full h-full">
                    <div v-if="loading" class="w-full h-full flex justify-center items-center ">
                        <Spinner :loading="loading" />
                    </div>
                     
                    
                    <div v-else  class="w-full h-full">
                        <x-table
                            v-if="categories"
                            :head="['image', 'name', 'status', 'offer', 'created', '' ]"
                            @select-all="toggleSelectAll"
                            >
                                <x-table-body v-for="category in categories" :key="category.id">
                                    <x-table-body-cell  justify="center">
                                        <input v-model="category.selected" @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-blue-600 rounded border-gray-300 lg:w-4 lg:h-4 focus:ring-blue-500">
                                    </x-table-body-cell>
            
                                    <x-table-body-cell justify="center">
                                        <x-photo-card-preview :file="category?.preview_image" />
                                    </x-table-body-cell>
            
                                    <x-table-body-cell>
                                        {{ category.name }}
                                    </x-table-body-cell>

                                    <x-table-body-cell>
                                        <div class="flex w-full justify-start items-center ">
                                            <span v-if="category.status" class="mr-3 text-sm font-medium text-green-500">Active</span>
                                            <span v-else class="mr-3 text-sm font-medium text-red-500">No active</span>
                                        </div>
                                    </x-table-body-cell>

                                    <x-table-body-cell justify="start">
                                        {{ category?.offer?.title }}
                                    </x-table-body-cell>
            
                                    <x-table-body-cell>
                                        {{ category.created_at }}
                                    </x-table-body-cell>
            
                                    <x-table-body-cell justify="center">
                                        <div class="w-full justify-center items-center">
                                            <x-btn
                                                @click="openPhotosGallery(category)"
                                                class="h-9 w-9"
                                                :tooltip="{text: 'Add images'}"
                                                color="secondary"
                                                strip
                                                rounded
                                                icon
                                            >
                                                <Icon name="material-symbols:add-photo-alternate-outline-sharp" class="text-xl" />
                                            </x-btn>

                                            <x-btn  @click="openCategoryPreview(category)" color="secondary" icon strip :tooltip="{text: 'Preview'}" rounded>
                                                <Icon name="mdi:eye"  class="text-2xl"/>
                                            </x-btn>
            
                                            <x-btn
                                                @click="openEditCategory(category)"
                                                class="h-9 w-9"
                                                :tooltip="{text: 'Edit'}"
                                                color="secondary"
                                                strip
                                                rounded
                                                icon
                                            >
                                                <Icon name="material-symbols:edit" class="text-xl" />
                                            </x-btn>
                                            
                                            <x-btn  @click="deletedCategory(category.id)" color="danger" icon strip :tooltip="{text: 'Deleted'}" rounded>
                                                <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                            </x-btn>
                                        </div>
                                    </x-table-body-cell>
                                </x-table-body>
                         </x-table>
 
                         <div v-if="categories">
                             <x-pagination :count="categories.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                         </div>
                    </div>

                </div>
                
                <x-modal-photo-gallery
                    :show="isShowModalPhotoGallery"
                    @close="closeModalPhotoGallery"
                    @addedToLibrary="addPhotosToCategory"
                    max-width="max"
                    title="Gallery"
                    :multiple="true"
                />

                <x-modal-category-preview
                    :show="isShowModalCategoryPreview"
                    @close="(event) => isShowModalCategoryPreview = event"
                    :category="previewCategory"
                    max-width="max"
                    :title="`Category preview: ${previewCategory.name}`"
                />

                <x-modal-category-edit
                    :show="isShowModalCategoryEdit"
                    @close="(event) => isShowModalCategoryEdit = event"
                    :category="previewCategory"
                    max-width="max"
                    :title="`Category edit: ${previewCategory.name}`"
                />

            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>