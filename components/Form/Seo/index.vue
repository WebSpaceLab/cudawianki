<script setup>

const { createdSeo, getSeo, updateSeo } = useSeoApi()
const { createdMediaFiles } = useMediaFiles()
const file = ref()
let isData = ref(false)


const form = ref({
    title: '',
    description: '',
    media: null
})

function onSelectedFile($event) {
    let files = $event.target.files
    
    uploadFile(files)
}

async function uploadFile(files) {
    const { data } = await createdMediaFiles(files[0])
    
    form.value.media = data
}

async function fetchSeo() {
    const { data } = await getSeo()
    if(data) {
        form.value = data

        isData.value = true

        return
    }

    isData.value = false
 }


async function  create () {
    
    const { data } = await createSeo(form.value)

    fetchSeo()
}

async function  update () {

    const { data } = await updateSeo({
        title: form.value.title,
        description: form.value.description,
        mediaId: form.value.media.id
    })

    fetchSeo()
}

onMounted(() => {
    fetchSeo()
})
</script>

<template>
    <div class="w-full flex flex-col justify-start items-start space-y-6">
        <div class="w-full h-40  flex justify-start items-start space-x-6">
            <div class="h-full">
                <label v-if="!form.media" class="w-40 h-full bg-gray-600 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <input ref="file" @input="onSelectedFile" type="file" name="file" class="sr-only">
                </label>
    
                <img v-else :src="form.media.filePath" :alt="form.media.name" class="w-40 h-full object-cover" />
            </div>

            <div class="w-full h-full flex flex-col inset-y-0">
                <div class="w-full h-16 flex justify-between items-between">
                    <label class="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        Change file

                        <input ref="file" @input="onSelectedFile" type="file" name="file" class="sr-only">
                    </label>

                    <x-btn v-if="isData" @click.prevent="update" color="primary-outline"  rounded >Update</x-btn>
                    <x-btn v-else @click.prevent="create" color="primary-outline"  rounded >Create</x-btn>
                </div>
                
                <div class="w-full h-full flex justify-center items-end">
                    <x-input v-model="form.title" label="Site Title" />
                </div>
            </div>
        </div>

        <div class="w-full">
            <x-textarea v-model="form.description" label="Site Description" />
        </div>
    </div>
</template>