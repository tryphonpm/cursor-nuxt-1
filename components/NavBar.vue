<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-white font-bold">MonApp</NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="user">
            <NuxtLink
              to="/profile"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Profil
            </NuxtLink>
            <button
              @click="handleLogout"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Déconnexion
            </button>
          </template>
        </div>
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
