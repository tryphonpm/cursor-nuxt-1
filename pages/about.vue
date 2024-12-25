<script lang="ts" setup>
import { useCounterStore } from '~/stores/counter';

const counter = useCounterStore();

useHead({
  title: 'À propos - Mon Site',
  meta: [{ name: 'description', content: 'En savoir plus sur notre entreprise' }],
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-5xl font-bold text-blue-600">A propos</h1>
    <div class="mt-4">
      <p class="text-2xl">Compteur : {{ counter.count }}</p>
      <button @click="counter.increment()" class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
        Incrémenter
      </button>
    </div>
  </div>
</template>
