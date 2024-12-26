<template>
  <nav class="nav">
    <div class="nav-content container">
      <NuxtLink to="/" class="nav-link">MonApp</NuxtLink>
      <div class="flex items-center space-x-4">
        <template v-if="authStore.isAuthenticated">
          <NuxtLink to="/profile" class="nav-link">Profil</NuxtLink>
          <button @click="handleLogout" class="nav-link">Déconnexion</button>
        </template>
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
  try {
    await authStore.clearAuth();
    await router.push('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
}
</script>

<style scoped>
.nav {
  @apply bg-white dark:bg-gray-800 shadow;
}

.nav-content {
  @apply flex justify-between items-center py-4;
}

.nav-link {
  @apply text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium;
}
</style>
