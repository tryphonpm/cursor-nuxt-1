<script lang="ts" setup>
// Logique spécifique à l'admin
</script>

<template>
  <div class="admin-layout">
    <aside>
      <!-- Menu admin -->
      <nav>
        <NuxtLink to="/admin">Dashboard</NuxtLink>
        <NuxtLink to="/admin/users">Utilisateurs</NuxtLink>
      </nav>
    </aside>

    <main>
      <slot />
    </main>
  </div>
</template>
