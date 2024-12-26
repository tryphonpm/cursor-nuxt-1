<template>
  <button
    class="theme-toggle"
    @click="toggleColorMode"
    :title="colorMode.value === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'"
  >
    <span v-if="colorMode.value === 'dark'">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>

<script setup>
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped>
.theme-toggle {
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.25rem;
}
</style>
