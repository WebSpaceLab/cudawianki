<script setup>
import { storeToRefs } from 'pinia';

const { $offers } = useNuxtApp()
const { allOffers , pagination, months, queryParams,  status } = storeToRefs($offers)

definePageMeta({
    layout: "authorization",
})

const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    month: queryParams.value.month ? queryParams.value.month : null,
    status: queryParams.value.status ? queryParams.value.status : null,
    orderBy: queryParams.value.orderBy ? queryParams.value.orderBy : 'created_at',
    orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'desc'
})

const perPage = ref(8)

let isShowModalDialog = ref(false)
let isShowOfferPreview = ref(false)
let isShowModalCategoryCreate = ref(false)
let isShowModalPhotoGallery = ref(false)
let isShowModalOfferEdit = ref(false)
let offerPreview = ref(null)
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

const allStatus = computed(() => {
    return [
        {value: null, label: 'All status'},
        ...status.value,
    ];
});

async function  getOffers () {
    try {

        await $offers.getOffers(query.value, perPage.value)
    } catch (error) {
        console.error(error)
    } 
}

function closeModalDialog (event) {
    isShowModalDialog.value = event
}

function addedToLibrary (event) {
    getOffers()
}

function switchPage(event) {
    page.value = event
    getOffers()
}

function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    getOffers()
}

function toggleSelectAll(e) {
    allOffers.value.forEach(item => item.selected = e.target.checked)
    
    showFieldAction()
}

function openAddCategoryToOffer(offer) {
    offerPreview.value = offer
    isShowModalCategoryCreate.value = true
}

function openOfferPreview(offer) {
    offerPreview.value = offer
    isShowOfferPreview.value = true
}

function openOfferEdit(offer) {
    offerPreview.value = offer
    isShowModalOfferEdit.value = true
}

async function deletedOffer(offer) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {
            const categoriesId = offer.categories.map((category) => category.id)
            const mediaId = offer.images.map((image) => image.id)
            await $offers.deletedOffer(offer.id, categoriesId, mediaId)
        } catch (error) {
            console.error(error)
        } finally {
            getOffers()
        }
    }
}

async function executeAction(actionId) {
    const fileIds = allOffers.value.filter(item => item.selected)
        .map(item => item.id);

    if (!actionId.length) return;

    switch (actionId) {
        case 'delete':
        if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
            fileIds.forEach(async (offerId) => {
                try {
                    
                    const deleteOffer = await $offers.deletedOffer(offerId)
        
                    if(deleteOffer) {
                        isShowActions.value = false
                        selectAll.value = false
                        getOffers()
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
    const isSelectedFile = allOffers.value.filter(item => item.selected)

    if(isSelectedFile.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}

function openPhotosGallery(offer) {
    offerPreview.value = offer
    isShowModalPhotoGallery.value = true
}

function closeModalPhotoGallery(event) {
    isShowModalPhotoGallery.value = event
}

const addPhotosToOffer = async (event) => {
    if(event) {    
        await $offers.addPhotosToOffer(offerPreview.value.id, {photoIds: event})
    
        getOffers()
    }
}

onMounted(() => {
    getOffers()
})

watch(() => query.value.term, () => {
    setTimeout(() => {
        page.value = 1
        getOffers()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(() => {
        page.value = 1
        getOffers()
    }, 300)
})

watch(() => query.value.status, () => {
    setTimeout(() => {
        page.value = 1
        getOffers()
    }, 300)
})

watch(() => query.value.orderBy, () => {
    page.value = 1
    getOffers()
})

watch(() => query.value.orderDir, () => {
    page.value = 1
    getOffers()
})
</script>

<template>
    <x-section-dashboard :container="false">
        <template #header-panel>
            <x-btn
                v-if="allOffers.length != 0"
                to="/dashboard/offers/categories"
                class="h-9 group"
                color="secondary-outline"
                shadow
                rounded
                icon-left
                link
            >
                <template #icon-left>
                    <Icon name="carbon:category" class="text-xl text-secondary-400 group-hover:text-secondary-200" />
                </template>
                
                <span class="text-secondary-400 group-hover:text-secondary-200">
                    Categories
                </span>
            </x-btn>

            <x-btn
                to="/dashboard/offers/create"
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
                    Add new offer
                </span>
            </x-btn>
        </template>

        <template #main>
            <div class="w-full h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
                <div class="w-full flex justify-between mb-8">
                    <div class="flex justify-center items-center space-x-3 ">
                        <div class="flex justify-center items-center space-x-3 ">
                            <select v-model="query.orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option value="created_at">Uploading</option>
                                <option value="name">Alphabetically</option>
                                <option value="updated_at">Updates</option>
                            </select>
    
                            <select v-model="query.orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option value="desc">Sort by descending</option>
                                <option value="asc">Sort by ascending</option>
                            </select>

                            <select v-model="query.month"  aria-label="Media date" id="date" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.label }}</option>
                            </select>

                            <select v-model="query.status" aria-label="Media type" id="type" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option v-for="status in allStatus" :key="status.value" :value="status.value">{{ status.label }}</option>
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


                <div class="w-full h-full ">
                    <div  class="w-full h-full ">
                        <x-table
                             :head="['image', 'title', 'status', 'path', 'created', '' ]"
                             @select-all="toggleSelectAll"
                         >
                         
                             <x-table-body v-for="(offer, index) in allOffers" :key="offer.index = index">
                                 <x-table-body-cell  justify="center">
                                     <input v-model="offer.selected" @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-blue-600 rounded border-gray-300 lg:w-4 lg:h-4 focus:ring-blue-500">
                                 </x-table-body-cell>
         
                                 <x-table-body-cell justify="center">
                                     <x-photo-card-preview :file="offer.preview_image" />
                                 </x-table-body-cell>
         
                                 <x-table-body-cell>
                                     {{ offer.title }}
                                 </x-table-body-cell>

                                 <x-table-body-cell>
                                    <div class="flex w-full justify-start items-center">
                                        <span v-if="offer.status" class="mr-3 text-sm font-medium text-green-500">Active</span>
                                        <span v-else class="mr-3 text-sm font-medium text-red-500">No active</span>
                                    </div>
                                </x-table-body-cell>
        
                                 <x-table-body-cell justify="start">
                                     {{ offer.path }}
                                 </x-table-body-cell>
         
                                 <x-table-body-cell>
                                     {{ offer.created_at }}
                                 </x-table-body-cell>
         
                                 <x-table-body-cell justify="center">
                                     <div class="w-full justify-center items-center">
                                        <x-btn
                                            v-if="offer?.categories?.length == 0"
                                            @click="openPhotosGallery(offer)"
                                            class="h-9 w-9"
                                            :tooltip="{text: 'Add images'}"
                                            color="secondary"
                                            strip
                                            rounded
                                            icon
                                        >
                                            <Icon name="material-symbols:add-photo-alternate-outline-sharp" class="text-xl" />
                                        </x-btn>

                                        <x-btn
                                            v-if="offer?.images?.length == 0"
                                            @click="openAddCategoryToOffer(offer)"
                                            class="h-9 w-9"
                                            :tooltip="{text: 'Add category to offer'}"
                                            color="secondary"
                                            strip
                                            rounded
                                            icon
                                        >
                                            <Icon name="material-symbols:add-circle" class="text-xl" />
                                        </x-btn>

                                         <x-btn  @click="openOfferPreview(offer)" color="secondary" icon strip :tooltip="{text: 'Preview'}" rounded>
                                             <Icon name="mdi:eye"  class="text-2xl"/>
                                         </x-btn>
         
                                         <x-btn
                                             @click="openOfferEdit(offer)"
                                             class="h-9 w-9"
                                             :tooltip="{text: 'Edit'}"
                                             color="secondary"
                                             strip
                                             rounded
                                             icon
                                         >
                                             <Icon name="material-symbols:edit" class="text-xl" />
                                         </x-btn>
                                         <!--
                                            <x-btn  @click="deletedOffer(offer)" color="danger" icon strip :tooltip="{text: 'Deleted nie działa!'}" rounded>
                                                <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                            </x-btn>
                                        -->
                                     </div>
                                 </x-table-body-cell>
                             </x-table-body>
                         </x-table>
         
                         <div v-if="allOffers">
                             <x-pagination :count="allOffers.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                         </div>
                    </div>

                </div>
                
                <x-modal-photo-dropzone
                    :show="isShowModalDialog"
                    @close="closeModalDialog"
                    @addedToLibrary="addedToLibrary"
                    title="Add new assets"
                />

                <x-modal-photo-gallery
                    :show="isShowModalPhotoGallery"
                    @close="closeModalPhotoGallery"
                    @addedToLibrary="addPhotosToOffer"
                    max-width="max"
                    title="Gallery"
                    :multiple="true"
                />

                <x-modal-category-create
                    :show="isShowModalCategoryCreate"
                    :offer="offerPreview"
                    @close="(event) => isShowModalCategoryCreate = event"
                    @addedToLibrary="addedToLibrary"
                    :title="`Creating a new category for the offer called: ${offerPreview?.title}`"
                />

                <x-modal-offer-edit
                    :show="isShowModalOfferEdit"
                    :offer="offerPreview"
                    @close="(event) => isShowModalOfferEdit = event"
                    @addedToLibrary="addedToLibrary"
                    :title="`Offer edit: ${offerPreview?.title}`"
                />

                <x-modal-offer-preview
                    :show="isShowOfferPreview"
                    :offer="offerPreview"
                    @close="event => isShowOfferPreview = event"
                />
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>