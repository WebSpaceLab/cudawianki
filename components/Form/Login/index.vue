<script setup>
const { $userStore, $generalStore } = useNuxtApp()
let canSeeThePassword = ref(false)
const router = useRouter()

const data = reactive({
    email: '',
    password: '',
    loading: false
})

let errors = ref(null)

const login = async () => {
    errors.value = null
    data.loading = true

    try {
        await $userStore.getTokens()
        await $userStore.login(data.email, data.password)
        await $userStore.getUser()

        router.push('/dashboard')
    } catch (error) {
        console.error(error)
        errors.value = error.response.data.errors
    } finally {
        data.loading = false
    }
}
</script>

<template>
    <div class="relative w-full">
        <span class="w-full flex flex-col justify-center items-center">
            <Icon name="bi:person-fill" class="w-30 h-30" />
            <div class="text-center text-[28px] mb-4 font-bold">Log in</div>
        </span>

        <div class="pt-5 space-y-6">
            <x-input
                v-model="data.email"
                color="blue"
                label="@email"
                icon
                :error="errors && errors.email ? errors.email[0] : ''"
            >
                <template #icon>
                    <Icon name="material-symbols:mark-email-unread-sharp" class="text-xl" />
                </template>
            </x-input>

            <x-input
                v-model="data.password"
                :type="canSeeThePassword ? 'text' : 'password'"
                color="blue"
                label="@password"
                icon
                right-icon
                :error="errors && errors.password ? errors.password[0] : ''"
            >
                <template #icon>
                    <Icon name="teenyicons:password-solid" class="text-xl" />
                </template>

                <template #right-icon>
                    <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                    <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                </template>
            </x-input>

            <div class="px-6 text-[12px] text-gray-600">Forget password?</div>

            <div class="w-full space-y-6">
                <x-btn @click="login" class="w-full" type="submit" rounded shadow color="success-outline" :disabled="(!data.email || !data.password)">Login</x-btn>
                <!--
                    <x-btn  class="w-full" rounded shadow color="info-outline">Register</x-btn>
                -->
            </div>
        </div>        
    </div>
</template>