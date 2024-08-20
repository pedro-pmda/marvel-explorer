<script setup lang="ts">
import { useComics } from '@/composables/marvelApi'
import type { Comic } from '@/types/marvel'
import { onMounted, ref, type Ref } from 'vue'
import LoadingIndicator from './LoadingIndicator.vue'
const isLoading: Ref<boolean> = ref(false)
const data: Ref<Comic[] | undefined> = ref()

const getComics = async () => {
  isLoading.value = true
  const comics = await useCo
  mics()

  data.value = comics.results
  isLoading.value = false
}

onMounted(async () => {
  await getComics()
})
</script>

<template>
  <div>
    <div v-if="isLoading">
      <loading-indicator></loading-indicator>
    </div>
    <div v-if="data && !isLoading">
      <div class="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div :key="comic.id" v-for="comic in data">{{ comic.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
