export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const publicRoutes = ['/login', '/register', '/forgot-password'];

  // Vérifier si la route actuelle est publique
  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Vérifier l'authentification
  const isAuthenticated = await authStore.checkAuth();

  if (!isAuthenticated) {
    return navigateTo('/login');
  }
});
