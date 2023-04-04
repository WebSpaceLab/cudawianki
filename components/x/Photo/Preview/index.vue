<script setup>
const props = defineProps({
    isShowPreviewImage: Boolean,
    photos: Array,
    preview: Object
});

const emits = defineEmits([
    'close', 'preview'
]);

const viewPhotos = ref([]);

let prevImage = ref(0);
let nextImage = ref(6);
let numberOfPhotos = ref(6);
let isShowAllImages = ref(true)
let isShowArrowLeft = ref(true)
let isShowArrowRight = ref(true)


function openPreview(item) {
    emits( 'preview', item)
}

function next(index) {

    if(index + 1 < props.photos.length) {
        index ++;
    } else {
        index = 0;
    }

    props.photos.forEach(item => {
        if(item.index === index) {
            openPreview(item);
        }
    });
}

function previous(index) {
    if(index > 0) {
        index --;
    } else {
        index = props.photos.length - 1;
    }

    props.photos.forEach(item => {
        if(item.index === index) {
            openPreview(item);
        }
    });
}

function close() {
    viewPhotos.value = []
    emits('close', false)
}

function allPhotos() {
    const photos = [];

    if(props.photos.length >= numberOfPhotos.value) {
        props.photos.forEach((item , index) => {
            if(index >= prevImage.value && index <= nextImage.value) {
                photos.push(item);
            }
        })

       viewPhotos.value = photos
    } else {
        viewPhotos.value = props.photos;
    }
}

function prevImages() {
    if(nextImage.value >= numberOfPhotos.value + 1) {
        prevImage.value--;
        nextImage.value--;

    } else {
        if(prevImage.value === 0) {
            prevImage.value = props.photos.length-1;
        } else if(nextImage.value === 0) {
            prevImage.value --;

            nextImage.value = props.photos.length
        } else {
            prevImage.value --;
        }
        nextImage.value--;
    }

    viewPhotos.value.pop();
    viewPhotos.value.unshift(props.photos[prevImage.value])
}

function nextImages() {
    if(nextImage.value <= props.photos.length-2 ) {
        if(prevImage.value === props.photos.length -1) {
            prevImage.value = 0;
        } else {
            prevImage.value++;
        }
        nextImage.value++;
    } else {
        if( nextImage.value === props.photos.length -1) {
            nextImage.value = 0;
        }else if(prevImage.value === props.photos.length -1) {
            prevImage.value = 1;
            nextImage.value++;
        } else {
            nextImage.value ++;
        }

        prevImage.value++;
    }

    viewPhotos.value.shift();
    viewPhotos.value.push(props.photos[nextImage.value]);
}

watch(() => props.isShowPreviewImage, () => {
    allPhotos()
})
</script>

<template>
     <transition
        enter-active-class="transition ease-in duration-300"
        enter-from-class="transform scale-0"
        enter-to-class="transform scale-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform translate-x-0"
        leave-to-class="transform translate-x-[100vw]"
    >
        <div v-if="isShowPreviewImage" class="fixed w-screen h-screen top-0 left-0 bg-slate-800/90 backdrop-blur z-60 flex flex-col justify-start items-center">
            <header class="h-20 w-screen px-8 relative  mb-6 bg-black ">
                <div class="w-full h-full flex justify-between items-center px-5 box-border">
                    <h2 class="text-lg text-blue-300">
                        {{ preview.name }}
                    </h2>
    
                    <div class="">
                        <x-btn @click="close()"  strip icon>
                            <Icon name="ion:ios-close-circle-outline" class="text-3xl text-red-500 hover:text-red-300"></Icon>
                        </x-btn>
                    </div>
                </div>
            </header>

            <div v-if="preview" class="container relative mx-auto max-w-full h-[80%] relative flex justify-center items-center overflow-hidden">
               <div
                    v-if="isShowArrowLeft"
                    @click="previous(preview.index)"
                    class="w-10 h-full flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-l-xl"
                >
                    <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl"></Icon>
                </div>

                <transition
                    enter-active-class="transition ease-in duration-600"
                    enter-from-class="transform blur-100 brightness-500"
                    enter-to-class="transform blur-0 brightness-0"
                >
                    <img  class="h-full w-full object-cover duration-300" :src="preview.filePath" :alt="preview.alt" />
                </transition>

                <div
                  v-if="isShowArrowRight"
                  @click="next(preview.index)"
                  class="w-10 h-full flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-r-xl"
                >
                    <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-white"></Icon>
                </div>
            </div>

            <div v-if="isShowAllImages && viewPhotos.length > 1" class="absolute bottom-0 -translate-y-4 py-4 px-1 mx-auto h-40 hidden lg:flex flex-row justify-center items-center space-x-3 bg-black/30 rounded-xl">
                <div v-if="viewPhotos.length > 6" @click="prevImages()" class="h-full p-3 flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-l-xl">
                    <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl"></Icon>
                </div>

                <div v-for="photo in viewPhotos" :key="photo.id" class="h-full flex justify-center items-center my-4 rounded-lg duration-300 ">
                   <img
                        v-if="photo"
                        :alt="photo.alt"
                        :class="[photo.index === preview.index ? 'border border-active scale-100 transition-all duration-300 ease-linear shadow-xl shadow-black' : 'scale-80 transition-all duration-300 ease-linear']"
                        :src="photo.filePath"
                        @click="openPreview(photo)"
                        class="h-full w-30 cursor-pointer object-cover rounded-lg"
                    />
                </div>

                <div v-if="viewPhotos.length > 6" @click="nextImages()" class="h-full p-3 flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-r-xl">
                    <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-white"></Icon>
                </div>
            </div>
        </div>
    </transition>
</template>
