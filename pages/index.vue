<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
          Bienvenue sur notre application
        </h1>
        <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          {{
            user
              ? `Connecté en tant que ${user.username}`
              : 'Veuillez vous connecter pour continuer'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
});

const user = useState('user');
</script>
