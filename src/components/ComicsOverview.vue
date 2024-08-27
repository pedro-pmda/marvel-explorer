<script setup lang="ts">
import { useComics } from '@/composables/marvelApi'
import type { Comic } from '@/types/marvel'
import { onMounted, ref, watch, type Ref } from 'vue'
import LoadingIndicator from './LoadingIndicator.vue'

import { useRoute, useRouter } from 'vue-router'
import ComicCard from './ComicCard.vue'
import Pagination from './Pagination.vue'

const route = useRoute()
const router = useRouter()

const isLoading: Ref<boolean> = ref(false)
const data: Ref<Comic[] | undefined> = ref()
const currentPage: Ref<number | string> = ref(0)
const totalPages: Ref<number> = ref(0)

if (route.params.page) {
  currentPage.value = +route.params.page
}

const getComics = async (page: number = 0) => {
  isLoading.value = true

  try {
    const comics = await useComics(page)
    currentPage.value = comics?.offset / comics?.limit || 0
    totalPages.value = Math.ceil(comics.total / comics.limit)

    data.value = comics.results
    isLoading.value = false
  } catch (e) {
    console.error(`There was a error getting the comics`)
    router.push({ path: 'error', query: { info: e as string } })
  }
}

watch(
  () => route.params.page,
  async (newPage) => {
    await getComics(+newPage)
  }
)

onMounted(async () => {
  await getComics(+currentPage.value)
})
</script>

<template>
  <div>
    <loading-indicator v-if="isLoading" text="Loading comics..." />
    <div v-if="data && !isLoading">
      <div class="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ComicCard :comic="comic" :key="comic.id" v-for="comic in data" />
      </div>
    </div>
    <Pagination
      v-if="data && !isLoading"
      :total-pages="totalPages"
      path="/"
      :current-page="+currentPage"
    />
  </div>
</template>

<style scoped></style>
