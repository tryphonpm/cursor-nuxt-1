<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <div class="min-h-screen p-6">
    <h1 class="text-3xl font-bold mb-6">Tableau de bord</h1>
    <p>Bienvenue sur votre tableau de bord</p>
  </div>
</template>
