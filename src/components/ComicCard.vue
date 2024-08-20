<script setup lang="ts">
import { Comic } from '@/types/marvel'
import CardView from './CardView.vue'

interface Props {
  comic: Comic
}
const props = defineProps<Props>()

const lf = new Intl.ListFormat('en')

const characterList = computed(() => props.comic.characters.items.map((c) => c.name))
const creatorList = computed(() => props.comic.creators.items.map((c) => c.name))
</script>

<template>
  <CardView>
    <template #header>
      {{ comic.title }}
    </template>
    <template #default>
      <img
        class="aspect-[150/228] shadow-xl float-left mr-4"
        :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
        width="150"
      />
      <dl>
        <dt>Series:</dt>
        <dd>{{ comic.series.name }}</dd>
        <dt v-if="characterList.length > 0">Characters:</dt>
        <dd v-if="characterList.length > 0">
          {{ lf.format(characterList) }}
        </dd>
        <dt v-if="creatorList.length > 0">Creators:</dt>
        <dd v-if="creatorList.length > 0">
          {{ lf.format(creatorList) }}
        </dd>
      </dl>
    </template>
  </CardView>
</template>
