<script setup lang="ts">
import type { Character } from '@/types/marvel'
import CardView from './CardView.vue'
interface Props {
  character: Character
}

const props = defineProps<Props>()
</script>
<template>
  <CardView :id="props.character.id">
    <img
      :src="`${props.character.thumbnail.path}.${props.character.thumbnail.extension}`"
      class="float-left w-12 h-12 mb-2 mr-4 rounded-full shadow-md aspect-square"
    />
    <template #header>{{ props.character.name }}</template>
    <div class="text-base max-w-prose">{{ props.character.description }}</div>
  </CardView>
</template>
