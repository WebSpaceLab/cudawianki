<script setup>
import { storeToRefs } from 'pinia';
const { $generalStore, $metaStore, $social, $userStore, $contact, $offers, $categories, $about } = useNuxtApp()

const { title, faviconUrl, description, loading  } = storeToRefs($generalStore)
const { meta } = storeToRefs($metaStore)
// let isShowCookieConsent = ref(true)
onMounted(async () => {
  loading.value = true
  try {
    await $generalStore.getGenerals()
    await $metaStore.getMetaTags()
    // await $generalStore.hasSessionExpired()
    // await $generalStore.updateCookieConsent(true)
    await $social.getSocialMedia()
    await $contact.get()
    await $offers.get()
    await $categories.get()
    await $about.get()

    if($userStore.id) {
      $userStore.getUser()
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }

  // if(!$generalStore.loading) {
  //   setTimeout(() => isShowCookieConsent.value = true, 3000)
  // }
})

// function onCookiesAccepted(group) {
//   console.log('cookies Accepted', group)
// }

// function onCookiesDeclined (group) {
//   console.log(group)
// }

function csrf_token() {

}

</script>

<template>
  <Head v-if="title && description">
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    
    <Meta v-for="(item, index) in meta" :key="index" :name="item.name" :content="item.content" :charset="item.charset" :http_equiv="item.http_equiv" />

    <Meta name="csrf-token" content="{{ csrf_token() }}"></Meta>
  </Head>
  
  <x-app> 
    <NuxtLayout>   
      <NuxtPage />
    </NuxtLayout>

    <x-toast />
<!--
  <x-cookie-consent
    v-if="isShowCookieConsent"
    @cookies-accepted="onCookiesAccepted"
    @cookies-declined="onCookiesDeclined"
    @close="event => isShowCookieConsent = event"
  />
-->

  </x-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(50rem);
}

.page-enter-from {
  transform: translateX(-100%);
}

.page-leave-to {
  transform: translateX(100%);
}
</style>
