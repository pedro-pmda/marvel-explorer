<script setup lang="ts">
import { useCharactersSearch } from '@/composables/marvelApi'
import { type Character } from '@/types/marvel'
import { ref, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoadingIndicator from './LoadingIndicator.vue'
import CharacterCard from './CharacterCard.vue'
import Pagination from './Pagination.vue'
import SearchForm from './SearchForm.vue'

const route = useRoute()
const router = useRouter()

const searchQuery: Ref<string> = ref('')

const isSearching: Ref<boolean> = ref(false)
const data: Ref<Character[] | undefined> = ref()
const currentPage: Ref<number | string> = ref(0)
const totalPages: Ref<number> = ref(0)

const getCharacterSearch = async (query: string, page: number = 0) => {
  try {
    if (query !== '') {
      isSearching.value = true
      searchQuery.value = query
      const search = await useCharactersSearch(query, page)

      currentPage.value = search?.offset / search?.limit || 0
      totalPages.value = Math.ceil(search.total / search.limit)

      data.value = search.results
      isSearching.value = false
    } else {
      searchReset()
    }
  } catch (e) {
    debugger
    console.error(`There was a error in the search characters`)
    router.push({ path: 'error', query: { info: e as string } })
  }
}

const searchReset = () => {
  searchQuery.value = ''
  currentPage.value = 0
  totalPages.value = 0
  data.value = undefined
}

const search = (query: string) => {
  searchReset()
  getCharacterSearch(query)
}

watch(
  () => route.params.page,
  async (newPage) => {
    searchReset()
    getCharacterSearch(route.params.query as string, newPage)
  }
)
</script>

<template>
  <div>
    <SearchForm :is-searching="isSearching" @search-submit="search" />
    <LoadingIndicator v-if="isSearching" :text="`Searching by '${searchQuery}'... `" />
    <div v-if="data && data.length > 0 && !isSearching">
      <div class="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CharacterCard v-for="character in data" :character="character" :key="character.id" />
      </div>
      <Pagination
        :total-pages="totalPages"
        :path="`/search/${searchQuery}/`"
        :current-page="+currentPage"
      >
      </Pagination>
    </div>
    <div
      v-if="data && data.length === 0 && searchQuery"
      class="flex flex-col items-center justify-center p-4 pt-16 min-h-min min-w-screen"
    >
      <div class="mb-4">
        <p>
          🦸🏻‍♂️Nothing found for "<em class="font-bold">{{ searchQuery }}</em
          >. Please try again 🦸🏼‍♀️
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
