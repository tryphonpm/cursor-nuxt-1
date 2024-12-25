<template>
  <nav class="nav">
    <div class="nav-content container">
      <NuxtLink to="/" class="nav-link">MonApp</NuxtLink>
      <div class="flex items-center space-x-4">
        <template v-if="user">
          <NuxtLink to="/profile" class="nav-link">Profil</NuxtLink>
          <button @click="handleLogout" class="nav-link">Déconnexion</button>
        </template>
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
const user = useState('user');
const router = useRouter();

async function handleLogout() {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' });
    user.value = null;
    await router.push('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
}
</script>
