<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import { storeToRefs } from 'pinia';

definePageMeta({
    layout: "authorization",
})

const { $userStore, $generalStore, $profileStore } = useNuxtApp()
const { name, bio, avatar_url } = storeToRefs($userStore)
const route = useRoute()

onMounted(() => {
    userName.value = name.value
    userBio.value = bio.value
    userImage.value = avatar_url.value
})

let file = ref(null)
let cropper = ref(null)
let uploadedImage = ref(null)
let userImage = ref(null)
let userName = ref(null)
let userBio = ref(null)
let isUpdated = ref(false)

const getUploadedImage = (e) => {
    file.value = e.target.files[0]
    uploadedImage.value = URL.createObjectURL(file.value)
}

const cropAndUpdateImage = async () => {
    const { coordinates } = cropper.value.getResult()
    let data = new FormData();
    data.append('image', file.value || '')
    data.append('height', coordinates.height || '')
    data.append('width', coordinates.width || '')
    data.append('left', coordinates.left || '')
    data.append('top', coordinates.top || '')   

    try {
        await $userStore.updateUserImage(data)
        await $userStore.getUser()
        await $profileStore.getProfile(route.params.id)
        $generalStore.updateSideMenuImage($generalStore.suggested, $userStore)
        $generalStore.updateSideMenuImage($generalStore.following, $userStore)
        userImage.value = image.value
        uploadedImage.value = null
    } catch (error) {
        console.log(error)
    }
}

const updateUserInfo = async () => {
    try {
        await $userStore.updateUser(userName.value, userBio.value)
        await $userStore.getUser()
        await $profileStore.getProfile(route.params.id)
        userName.value = name.value
        userBio.value = bio.value
        setTimeout(() => {
            $generalStore.isEditProfileOpen = false
        }, 100)
    } catch (error) {
        console.log(error)
    }
}

watch(() => userName.value, () => {
    if (!userName.value || userName.value === name.value) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})

watch(() => userBio.value, () => {
    if (!userName.value || userBio.value.length < 1) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})
</script>

<template>
    <x-section-dashboard title="Profil" :container="false">
        <template #header-panel>
            
        </template>

        <template #main>
            <div class="container mx-auto">
                <div 
                    class="relative bg-prime-light dark:bg-prime-dark w-full w-full mx-3 p-4 rounded-lg mb-10 shadow-xl shadow-black"
                    :class="!uploadedImage ? 'h-[655px]' : 'h-[580px]'"
                >

                    <div class="h-[calc(500px-200px)]" :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'">
                        <div v-if="!uploadedImage">
                            <div 
                                id="ProfilePhotoSection" 
                                class="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
                            >
                                <div class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                    Profile photo
                                </div>

                                <div class="flex items-center justify-center sm:-mt-6">
                                    <label for="image" class="relative cursor-pointer">
                                        <img 
                                            class="rounded-full" 
                                            width="95"
                                            height="95" 
                                            :src="userImage"
                                            alt="userName"
                                        >

                                        <div class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px]">
                                            <Icon name="ph:pencil-simple-line-bold" size="17" class="-mt-1 ml-0.5"/>
                                        </div>
                                    </label>
                                    
                                    <input
                                        class="hidden"
                                        type="file"
                                        id="image"
                                        @input="getUploadedImage"
                                        accept="image/png, image/jpeg, image/jpg"
                                    >
                                </div>
                            </div>

                            <div 
                                id="UsernameSectionSection" 
                                class="flex flex-col border-b sm:h-[118px]  px-1.5 py-2 mt-1.5  w-full"
                            >
                                <div class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                    Username
                                </div>

                                <div class="flex items-center justify-center sm:-mt-6">
                                    <div class="sm:w-[60%] w-full max-w-md">
                                        <x-input
                                            v-model="userName"
                                            color="blue"
                                            label="@Full name"
                                            icon
                                            error=""
                                        >
                                            <template #icon>
                                                <Icon name="material-symbols:person-3-rounded" class="text-xl" />
                                            </template>
                                        </x-input>

                                        <div class="text-[11px] text-gray-500 mt-4">
                                            Usernames can only contain letters, numbers, underscores, and periods. 
                                            Changing your username will also change your profile link.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div 
                                id="BioSection" 
                                class="flex flex-col sm:h-[120px]  px-1.5 py-2 mt-2 w-full"
                            >
                                <div class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                    Bio
                                </div>

                                <div class="flex items-center justify-center sm:-mt-6">
                                    <div class="sm:w-[60%] w-full max-w-md">
                                        <x-textarea 
                                            cols="30"
                                            rows="4"
                                            v-model="userBio"
                                            maxlength="80"
                                        ></x-textarea>
                                        <div v-if="userBio" class="text-[11px] text-gray-500">{{ userBio.length }}/80</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="w-full h-[430px]">
                            <Cropper
                                class="h-[430px]"
                                ref="cropper"
                                :stencil-component="CircleStencil"
                                :src="uploadedImage"
                            />
                        </div>
                    </div>
                    

                    <div class="absolute p-5 box-border left-0 bottom-0 border-t-solid border-t-prime w-full">
                        <div 
                            id="UpdateInfoButtons" 
                            v-if="!uploadedImage" 
                            class="flex items-center justify-end"
                        >
                            <x-btn 
                                :disabled="!isUpdated"
                                @click="updateUserInfo()"
                                color="primary-outline"
                                rounded
                                shadow
                            >
                                <span class="mx-4 font-medium text-[15px]">Save</span>
                            </x-btn>
                        </div>

                        <div 
                            id="CropperButtons" 
                            v-else 
                            class="flex items-center justify-end"
                        >

                            <x-btn
                                @click="cropAndUpdateImage()"
                                color="primary-outline"
                                rounded
                                shadow
                            >
                                <span class="mx-4 font-medium text-[15px]">Apply</span>
                            </x-btn>
                        </div>
                    </div>
                    
                </div>
            </div>

        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>