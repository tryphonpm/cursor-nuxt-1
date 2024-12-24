<script lang="ts" setup>
const props = defineProps({
  error: Object,
});

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>

<template>
  <div class="error-page">
    <h1>{{ error?.statusCode }}</h1>
    <p>{{ error?.message }}</p>
    <button @click="handleError">Retour à l'accueil</button>
  </div>
</template>
