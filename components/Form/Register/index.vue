<script setup>
const { $userStore } = useNuxtApp()
let canSeeThePassword = ref(false)
let canSeeTheConfirmPassword = ref(false)

const data = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false, 
})

let errors = ref(null)

const register = async () => {
    errors.value = null
    data.loading = true

    try {
        await $userStore.getTokens()

        await $userStore.register(
            data.name, 
            data.email, 
            data.password, 
            data.confirmPassword
        )

        await $userStore.getUser()

        router.push('/dashboard')
    } catch (error) {
        errors.value = error.response.data.errors
    } finally {
        data.loading = false
    }
}
</script>

<template>
    <form class="w-full">
        <span class="w-full flex flex-col justify-center items-center">
            <Icon name="bi:person-fill-add" class="w-30 h-30" />
            <div class="text-center text-[28px] mb-4 font-bold">Sign in</div>
        </span>

        <div class="pt-5 space-y-6">
            <x-input
                v-model="data.name"
                color="blue"
                label="@Full name"
                icon
                name="register_name"
                :error="errors && errors.name ? errors.name[0] : ''"
            >
                <template #icon>
                    <Icon name="material-symbols:person-3-rounded" class="text-xl" />
                </template>
            </x-input>

            <x-input
                v-model="data.email"
                color="blue"
                label="@Email"
                icon
                name="register_email"
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
                label="@Password"
                icon
                name="register_password"
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

            <x-input
                v-model="data.confirmPassword"
                :type="canSeeTheConfirmPassword ? 'text' : 'password'"
                color="blue"
                label="@Confirm password"
                icon
                name="register_password_confirm"
                right-icon
                :error="errors && errors.confirmPassword ? errors.confirmPassword[0] : ''"
            >
                <template #icon>
                    <Icon name="teenyicons:password-solid" class="text-xl" />
                </template>

                <template #right-icon>
                    <Icon v-if="canSeeTheConfirmPassword" @click="canSeeTheConfirmPassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                    <Icon v-else @click="canSeeTheConfirmPassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                </template>
            </x-input>

            <div class="w-full space-y-6">
                <x-btn
                    :disabled="(!data.name || !data.email || !data.password || !data.confirmPassword)"
                    @click="register()"
                    @keydown.enter="register()"
                    text="Sign Up"
                    class="w-full"
                    color="success-outline"
                    rounded
                    shadow
                /> 
            </div>
        </div>        
    </form>
</template>