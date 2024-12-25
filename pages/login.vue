<template>
  <div class="min-h-screen flex flex-center bg-login">
    <div class="login-card">
      <div class="login-header">
        <h2 class="login-title">Connexion</h2>
      </div>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="form-input"
            placeholder="Adresse email"
          />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="form-input"
            placeholder="Mot de passe"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-full">
          Se connecter
        </button>
      </form>

      <div class="login-footer">
        <p>
          Pas encore de compte ?
          <NuxtLink to="/register" class="link-primary">
            Créer un compte
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
});

const email = ref('');
const password = ref('');
const user = useState('user');
const router = useRouter();

async function handleLogin() {
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    });

    user.value = response.user;
    await router.push('/');
  } catch (error) {
    console.error('Erreur de connexion:', error);
    alert('Erreur lors de la connexion');
  }
}
</script>

<style scoped>
.bg-login {
  background-color: var(--bg-color);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  margin-bottom: 2rem;
}

.login-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  color: var(--text-color);
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.btn-full {
  width: 100%;
  margin-top: 1.5rem;
}

.login-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.link-primary {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.link-primary:hover {
  text-decoration: underline;
}
</style>
