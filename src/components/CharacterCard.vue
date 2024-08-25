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
      class="float-left w-44 h-44 mb-2 mr-4 rounded-xl shadow-md aspect-square hover:scale-150"
    />
    <template #header>{{ props.character.name }}</template>
    <div class="text-base max-w-prose">{{ props.character.description }}</div>
  </CardView>
</template>
