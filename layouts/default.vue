<script lang="ts" setup>
// Votre logique ici
</script>

<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Accueil</NuxtLink>
        <NuxtLink to="/about">À propos</NuxtLink>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>© 2024 Mon Site</p>
    </footer>
  </div>
</template>

<style scoped>
nav {
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

main {
  padding: 2rem;
}

footer {
  padding: 1rem;
  text-align: center;
}
</style>
