<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  totalPages: number
  currentPage: number
  path: string
  maxPageShown?: number
}

const props = defineProps<Props>()

const isOnFirstPage = computed(() => props.currentPage === 0)
const isOnLastPage = computed(() => props.currentPage === props.totalPages)
</script>

<template>
  <nav v-if="totalPages > 1" class="flex justify-center my-8">
    <span class="mr-4">
      <RouterLink :to="`${path}`" v-if="!isOnFirstPage">First</RouterLink>
      <span v-else class="opacity-50" aria-hidden>First</span>
    </span>
    <span class="mr-4">
      <RouterLink :to="`${path}${currentPage - 1}`" v-if="!isOnFirstPage">Previous</RouterLink>
      <span v-else class="opacity-50" aria-hidden>Previous</span>
    </span>
    <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
    <span class="ml-4">
      <RouterLink :to="`${path}${currentPage + 1}`" v-if="!isOnLastPage">Next</RouterLink>
      <span v-else class="opacity-50" aria-hidden>Next</span>
    </span>
    <span class="ml-4">
      <RouterLink :to="`${path}${totalPages - 1}`" v-if="!isOnLastPage">Last</RouterLink>
      <span v-else class="opacity-50" aria-hidden>Last</span>
    </span>
  </nav>
</template>

<style scoped></style>
