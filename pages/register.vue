<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md space-y-8 p-6">
      <h2 class="text-center text-3xl font-bold">Créer un compte</h2>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <p class="text-sm text-gray-500 mb-2">
            Votre prénom doit contenir uniquement des lettres
          </p>
          <UInput
            v-model="form.firstName"
            type="text"
            label="Prénom"
            placeholder="Entrez votre prénom"
            title="Votre prénom doit contenir uniquement des lettres"
            required
            help="Votre prénom sera utilisé pour personnaliser votre expérience"
          />
        </div>

        <div>
          <p class="text-sm text-gray-500 mb-2">
            Votre nom de famille doit contenir uniquement des lettres
          </p>
          <UInput
            v-model="form.lastName"
            type="text"
            label="Nom de famille"
            placeholder="Entrez votre nom de famille"
            title="Votre nom de famille doit contenir uniquement des lettres"
            required
            help="Votre nom de famille sera utilisé pour personnaliser votre expérience"
          />
        </div>

        <div>
          <p class="text-sm text-gray-500 mb-2">
            Le nom d'utilisateur doit contenir entre 3 et 20 caractères alphanumériques
          </p>
          <UInput
            v-model="form.username"
            type="text"
            label="Nom d'utilisateur"
            placeholder="Choisissez un nom d'utilisateur unique"
            title="Le nom d'utilisateur doit contenir entre 3 et 20 caractères alphanumériques"
            required
            help="Ce nom sera visible par les autres utilisateurs"
          />
        </div>

        <div>
          <p class="text-sm text-gray-500 mb-2">Entrez une adresse email valide</p>
          <UInput
            v-model="form.email"
            type="email"
            label="Adresse email"
            placeholder="exemple@domaine.com"
            title="Entrez une adresse email valide"
            required
            help="Nous ne partagerons jamais votre email"
          />
        </div>

        <div>
          <p class="text-sm text-gray-500 mb-2">
            Le mot de passe doit contenir au moins 8 caractères, incluant des lettres majuscules,
            minuscules et des chiffres
          </p>
          <UInput
            v-model="form.password"
            type="password"
            label="Mot de passe"
            placeholder="Choisissez un mot de passe sécurisé"
            title="Le mot de passe doit contenir au moins 8 caractères, incluant des lettres majuscules, minuscules et des chiffres"
            required
            help="Minimum 8 caractères, incluant lettres et chiffres"
          />
        </div>

        <div>
          <p class="text-sm text-gray-500 mb-2">
            Entrez à nouveau votre mot de passe pour confirmation
          </p>
          <UInput
            v-model="form.confirmPassword"
            type="password"
            label="Confirmation du mot de passe"
            placeholder="Répétez votre mot de passe"
            title="Entrez à nouveau votre mot de passe pour confirmation"
            required
            help="Les deux mots de passe doivent être identiques"
          />
        </div>

        <div class="space-y-4">
          <UButton type="submit" color="primary" :loading="loading" block>S'inscrire</UButton>

          <UButton to="/login" color="gray" variant="soft" block>
            Déjà un compte ? Se connecter
          </UButton>
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
const router = useRouter();

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const error = ref('');
const loading = ref(false);

async function handleRegister() {
  error.value = '';
  loading.value = true;

  try {
    if (form.password !== form.confirmPassword) {
      error.value = 'Les mots de passe ne correspondent pas';
      return;
    }

    const success = await authStore.register({
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
      email: form.email,
      password: form.password,
    });

    if (success) {
      await navigateTo('/dashboard');
    }
  } catch (e: any) {
    error.value = e.message || "Une erreur est survenue lors de l'inscription";
  } finally {
    loading.value = false;
  }
}

definePageMeta({
  middleware: [], // Pas de middleware d'auth pour la page register
});
</script>
