<template>
  <slot />
</template>

<script setup>
const user = useState('user', () => null);

onMounted(async () => {
  try {
    const response = await $fetch('/api/auth/me');
    user.value = response.user;
  } catch (error) {
    user.value = null;
  }
});
</script>
