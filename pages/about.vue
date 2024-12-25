<script lang="ts" setup>
import { useCounterStore } from '~/stores/counter';

const counter = useCounterStore();

useHead({
  title: 'À propos - Mon Site',
  meta: [{ name: 'description', content: 'En savoir plus sur notre entreprise' }],
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-5xl font-bold text-blue-600">A propos</h1>
    <div><Icon name="uil:github" /></div>
    <div class="mt-4">
      <p class="text-2xl">Compteur : {{ counter.count }}</p>
      <UButton variant="solid" color="primary" @click="counter.increment()" class="mt-2">
        Incrémenter
      </UButton>
      <DatePicker />
    </div>
  </div>
</template>
