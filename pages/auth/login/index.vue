<script setup>
import { storeToRefs } from 'pinia';

const { $generalStore } = useNuxtApp()
const { isLoginOpen } = storeToRefs($generalStore)

definePageMeta({
  layout: "guest",
  name: 'Login'
})
</script>


<template>
    <SectionAuth>
      <SectionAuthOverlay v-if="isLoginOpen"/>
    </SectionAuth>
</template>