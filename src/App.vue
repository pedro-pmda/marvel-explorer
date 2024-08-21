<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="my-4 text-center">
      <h1 class="mb-4 text-6xl font-extrabold uppercase">🔎 Marvel Explorer</h1>
      <nav>
        <RouterLink to="/" class="mx-4 px-4 py-2 border-2 rounded-s-md hover:text-slate-600">
          📗 Comics
        </RouterLink>
        <RouterLink to="/search" class="px-4 py-2 border-2 rounded-s-md hover:text-slate-600">
          🦸🏻‍♂️ Heroes
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
