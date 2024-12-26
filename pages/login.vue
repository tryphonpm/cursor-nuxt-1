<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md space-y-8 p-6">
      <h2 class="text-center text-3xl font-bold">Connexion</h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <p class="text-sm text-gray-600 mb-2">Entrez votre adresse email de connexion</p>
          <UInput
            v-model="email"
            type="email"
            label="Adresse email"
            placeholder="exemple@domaine.com"
            title="Entrez votre adresse email"
            required
            help="Entrez l'email associé à votre compte"
          />
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">Entrez votre mot de passe pour vous connecter</p>
          <UInput
            v-model="password"
            type="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            title="Entrez votre mot de passe"
            required
            help="Entrez votre mot de passe"
          />
        </div>

        <div class="space-y-4">
          <UButton type="submit" color="primary" :loading="loading" block>Se connecter</UButton>

          <UButton to="/register" color="gray" variant="soft" block>Créer un compte</UButton>
        </div>

        <div class="text-center mt-4">
          <p class="text-gray-600">
            Pas encore de compte ?
            <NuxtLink to="/register" class="text-blue-600 hover:text-blue-800">S'inscrire</NuxtLink>
          </p>
        </div>

        <p v-if="error" class="text-red-500 text-center mt-4">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleLogin() {
  error.value = '';
  loading.value = true;

  try {
    const success = await authStore.login(email.value, password.value);

    if (success) {
      navigateTo('/dashboard');
    } else {
      error.value = 'Identifiants invalides';
    }
  } catch (e) {
    error.value = 'Une erreur est survenue lors de la connexion';
  } finally {
    loading.value = false;
  }
}
</script>
