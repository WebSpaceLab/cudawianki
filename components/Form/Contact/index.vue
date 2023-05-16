<script setup>
const { $inbox, $flash } = useNuxtApp()

const errors = ref(null)

const form = ref({
    subject: '',
    sender: '',
    email: '',
    phone: '',
    content: ''
})

const reset = () => {
    form.value = {
        subject: '',
        sender: '',
        email: '',
        phone: '',
        content: ''
    }
}

const onSubmit = () => {
    $inbox.send(form.value).then(({data}) => {
        $flash.success(data.flash.message)
        reset()
    }).catch((err) => {
        errors.value = err.response.data.errors
    })
}

</script>

<template>
    <form>
        <div class="mb-6">
            <input
                v-model="form.subject"
                type="text"
                placeholder="Temat"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
                />

                <span v-if="errors && errors.subject" class="text-danger-600 text-[14px] font-semibold ml-4">{{ errors.subject[0] }}</span>
        </div>

        <div class="mb-6">
            <input
                v-model="form.sender"
                type="text"
                placeholder="Imię i Nazwisko"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            />

            <span v-if="errors && errors.sender" class="text-danger-600 text-[14px] font-semibold ml-4">{{ errors.sender[0] }}</span>
        </div>

        <div class="mb-6">
            <input
                v-model="form.email"
                type="email"
                placeholder="Email"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            />

            <span v-if="errors && errors.email" class="text-danger-600 text-[14px] font-semibold ml-4">{{ errors.email[0] }}</span>
        </div>

        <div class="mb-6">
            <input
                v-model="form.phone"
                type="text"
                placeholder="Numer telefonu"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            />

            <span v-if="errors && errors.phone" class="text-danger-600 text-[14px] font-semibold ml-4">{{ errors.phone[0] }}</span>
        </div>

        <div class="mb-6">
            <textarea
                v-model="form.content"
                rows="6"
                placeholder="Wiadomość"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                resize-none
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            ></textarea>

            <span v-if="errors && errors.content" class="text-danger-600 text-[14px] font-semibold ml-4">{{ errors.content[0] }}</span>
        </div>

        <div>
            <x-btn @click.prevent="onSubmit()" type="submit" class="w-full" color="primary" shadow rounded uppercase >Wyślij widomość</x-btn>
        </div>
    </form>
</template>