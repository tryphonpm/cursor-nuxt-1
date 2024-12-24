<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h1 class="text-2xl font-semibold text-gray-900 mb-6">Profil Utilisateur</h1>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Prénom</label>
              <div class="mt-1">
                <input
                  v-model="formData.firstName"
                  type="text"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Nom</label>
              <div class="mt-1">
                <input
                  v-model="formData.lastName"
                  type="text"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
              <div class="mt-1">
                <input
                  v-model="formData.username"
                  type="text"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input
                  v-model="formData.email"
                  type="email"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <AlertError :message="errorMessage" />

            <div class="flex justify-end">
              <button
                @click="updateProfile"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
});

const user = useState('user');
const errorMessage = ref('');

const formData = reactive({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  username: user.value?.username || '',
  email: user.value?.email || '',
});

async function updateProfile() {
  try {
    errorMessage.value = '';
    const response = await $fetch('/api/auth/update-profile', {
      method: 'PUT',
      body: formData,
    });
    user.value = response.user;
    alert('Profil mis à jour avec succès');
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour du profil';
  }
}
</script>
