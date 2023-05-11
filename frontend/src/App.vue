<script setup lang="ts">
import { useReady } from '@/composables/useReady'
import { onMounted } from 'vue'

const { ready, wait } = useReady()

onMounted(async () => {
  await wait()
})
</script>

<template>
  <div class="mx-2 mt-2">
    <template v-if="ready">
      <RouterView></RouterView>
    </template>
    <template>
      <div>Loading...</div>
    </template>
  </div>
</template>

<style scoped></style>
