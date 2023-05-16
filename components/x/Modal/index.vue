<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    overflowHidden: {
        type: Boolean,
        default: true
    },
    minimization: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits(['close']);


watch(() => props.show, () => {
    if (props.show) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = null;
    }
});

// watch(() => props.minimization, () => {
//     console.log(props.minimization)
//     // if (minimization) {
//     //     props.show = false
//     // } 
// })

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        'sm': ' sm:w-full sm:max-w-sm',
        'md': ' sm:w-full sm:max-w-md',
        'lg': ' sm:w-full sm:max-w-lg',
        'xl': ' sm:w-full sm:max-w-xl',
        '2xl': ' sm:w-full sm:max-w-2xl',
        '3xl': ' sm:w-full sm:max-w-3xl',
        '4xl': ' sm:w-full sm:max-w-4xl',
        '5xl': ' sm:w-full sm:max-w-5xl',
        '6xl': ' sm:w-full sm:max-w-6xl',
        '7xl': ' sm:w-full sm:max-w-7xl',
        'max': 'inset-0'
    }[props.maxWidth];
});

</script>

<template>
    <teleport to="body">
        <transition leave-active-class="duration-200">
            <div v-show="show" class="fixed flex justify-center items-center inset-0  sm:px-0 z-70" scroll-region>
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-black/20" />
                    </div>
                </transition>

                <transition

                    enter-active-class="transition ease-in duration-300"
                    enter-from-class="transform scale-0"
                    enter-to-class="transform scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="show"
                        class="rounded-lg shadow-xl shadow-black transform transition-all sm:mx-auto z-80"
                        :class="[
                            maxWidthClass,
                            overflowHidden ? 'overflow-hidden' : ''
                        ]"
                    >
                        <slot v-if="show" />
                  
                    </div>
                </transition>
            </div>

        </transition>
    </teleport>
</template>