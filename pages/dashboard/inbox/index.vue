<script setup>
import { storeToRefs } from 'pinia';

const { $inbox } = useNuxtApp()
const { mails , pagination, months, queryParams,  read } = storeToRefs($inbox)

definePageMeta({
    layout: "authorization",
})

const loading = ref(false)
const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    month: queryParams.value.month ? queryParams.value.month : null,
    read: queryParams.value.read ? queryParams.value.read : null,
    orderBy: queryParams.value.orderBy ? queryParams.value.orderBy : 'created_at',
    orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'desc'
})

const perPage = ref(8)

let isShowMailPreview = ref(false)
let mailPreview = ref(null)
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

const allReads = computed(() => {
    return [
        {value: null, label: 'All read'},
        ...read.value,
    ];
});

async function  getMails () {
    // loading.value = true

    try {

        await $inbox.getMails(query.value, perPage.value)
    } catch (error) {
        console.error(error)
    } 
    // loading.value = false
}


function addedToLibrary (event) {
    getMails()
}

function switchPage(event) {
    page.value = event
    getMails()
}

function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    getMails()
}

function toggleSelectAll(e) {
    mails.value.forEach(item => item.selected = e.target.checked)
    
    showFieldAction()
}

function mailHasBeenReed(mailId) {
    $inbox.mailHasBeenReed(mailId)

    getMails()
}

function openMailPreview(mail) {
    mailPreview.value = mail

    if(mail.is_read == 0) {
        mailHasBeenReed(mail.id)
    }

    isShowMailPreview.value = true
}


const closeMailPreview = () => {
    isShowMailPreview.value = false
    mailPreview.value = null
}

async function deletedMail(mail) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {

            await $inbox.deletedMail(mail.id)
            // closeMailPreview()
        } catch (error) {
            console.error(error)
        } finally {
            getMails()
        }
    }
}

async function executeAction(actionId) {
    const mailIds = mails.value.filter(item => item.selected)
        .map(item => item.id);

    if (!actionId.length) return;

    switch (actionId) {
        case 'delete':
        if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
            mailIds.forEach(async (mailId) => {
                try {
                    
                    const deleteMail = await $inbox.deletedMail(mailId)
        
                    if(deleteMail) {
                        isShowActions.value = false
                        selectAll.value = false
                        getMails()
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
    const isSelectedFile = mails.value.filter(item => item.selected)

    if(isSelectedFile.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}

onMounted(() => {
    getMails()
})

watch(() => query.value.term, () => {
    setTimeout(() => {
        page.value = 1
        getMails()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(() => {
        page.value = 1
        getMails()
    }, 300)
})

watch(() => query.value.read, () => {
    setTimeout(() => {
        page.value = 1
        getMails()
    }, 300)
})

watch(() => query.value.orderBy, () => {
    page.value = 1
    getMails()
})

watch(() => query.value.orderDir, () => {
    page.value = 1
    getMails()
})
</script>

<template>
    <x-section-dashboard :container="false">
        <template #header-panel>
        </template>

        <template #main>
            <div class=" h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl" >
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

                            <select v-model="query.read" aria-label="Media type" id="type" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                <option v-for="read in allReads" :key="read.value" :value="read.value">{{ read.label }}</option>
                            </select>

                            <div >
                                <x-select-action :actions="actions" :isShowActions="isShowActions" @execute="executeAction" />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center items-center space-x-3">
                        <x-btn v-if="isShowMailPreview" @click="closeMailPreview()" color="primary-outline" :tooltip="{text: 'Close the email preview window'}" icon shadow rounded>
                            <Icon name="icon-park-outline:preview-close-one" class="text-2xl"/>
                        </x-btn> 

                        <x-search v-model="query.term" icon />
                    </div>
                </div>


                <div class="w-full h-full flex">
                    <div class="transition-all duration-500 " :class="isShowMailPreview ? 'w-1/2' : 'w-full'">
                        <div v-if="loading" class="w-full h-full flex justify-center items-center ">
                            <Spinner :loading="loading" />
                        </div>
    
                        <div v-else class="w-full h-full transition-all duration-500 " >
                            <x-table
                                    :head="['sender', 'subject', 'created', '' ]"
                                    @select-all="toggleSelectAll"
                                >
                                
                                    <x-table-body v-for="(mail, index) in mails" :key="mail.index = index" :class="mail.is_read == 0 ? 'bg-black/30' : ''">
                                        <x-table-body-cell  justify="center">
                                            <input v-model="mail.selected" @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-blue-600 rounded border-gray-300 lg:w-4 lg:h-4 focus:ring-blue-500">
                                        </x-table-body-cell>
                
                                        <x-table-body-cell>
                                            {{ mail.sender }}
                                        </x-table-body-cell>

                                        <x-table-body-cell justify="start">
                                            {{ mail.subject }}
                                        </x-table-body-cell>
                
                                        <x-table-body-cell>
                                            {{ mail.createdAt }}
                                        </x-table-body-cell>
                
                                        <x-table-body-cell justify="center">
                                            <div class="w-full justify-center items-center">
                                                <x-btn  @click="openMailPreview(mail)" color="secondary" icon strip :tooltip="{text: 'Preview'}" rounded>
                                                    <Icon name="mdi:eye"  class="text-2xl"/>
                                                </x-btn>
                
                                                <x-btn  @click="deletedMail(mail)" color="danger" icon strip :tooltip="{text: 'Deleted nie działa!'}" rounded>
                                                    <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                                </x-btn>
    
                                            </div>
                                        </x-table-body-cell>
                                    </x-table-body>
                                </x-table>
                
                                <div v-if="mails">
                                    <x-pagination :count="mails.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                                </div>
                        </div>
                    </div>

                    <div class="p-2 h-full  transition-all duration-500 box-border rounded-xl" :class="isShowMailPreview ? 'w-1/2' : 'w-0'">
                        <section v-if="isShowMailPreview" class="w-full h-full bg-white flex flex-col space-y-6 transition-all duration-500 rounded">
                            <header class="px-6 box-border flex">
                                <div class="w-full">
                                    <h1>{{ mailPreview.subject }}</h1>
    
                                    <div class="flex flex-row space-x-2">
                                        <Icon name="material-symbols:frame-person" class="text-4xl"/>
                                        
                                        <div>
                                            <p class="m-0 text-sm"> Od: <span class=" text-black font-bold">{{  mailPreview.sender }} </span></p>
                                            <p class="m-0 text-sm">Mail: <span class=" text-black font-bold">{{  mailPreview.email }}</span></p>
                                            <p class="m-0 text-sm">Tel: <span class=" text-black font-bold">{{  mailPreview.phone }}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-full flex justify-end">
                                 <p class="text-sm">Wysłano: <span class=" text-black font-bold">{{  mailPreview.createdAt }} </span></p>
                                </div>
                            </header>

                            <div class="w-full h-full border-t-dashed border-gray-200 p-6 box-border text-black" v-html="mailPreview.content">
                            </div>

                            <footer></footer>
                        </section>
                    </div>
                </div>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>