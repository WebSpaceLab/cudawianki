<script setup>
const { $generalStore, $userStore } = useNuxtApp()

const title = ref('')
const description = ref('')
const meta = ref([{
  name: 'description',
  description: 'Nowy opis'
}])

// async function fetchSeo() {
//   const { data } = await getSeo()
//   title.value = data.title
//   description.value = data.description
// }
// onBeforeMount(() => {
//   fetchSeo() 
// })

onMounted(async () => {
  try {
    await $generalStore.hasSessionExpired()

    if($userStore.id) {
      $userStore.getUser()
    }
  } catch (error) {
    console.error(error)
  }
})

// useHead({
//   title,
//   meta: [{
//     name: 'description',
//     content: description
//   }]
// })

// useSeoMeta({
//   title,
//   description
// })
</script>

<template>
  <x-app>    
    <NuxtLayout>   
      <NuxtPage />
    </NuxtLayout>
  </x-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(50rem);
}

.page-enter-from {
  transform: rotateZ(-15deg) translateX(-100%);
}

.page-leave-to {
  transform: rotateZ(15deg) translateX(100%);
}
</style>
