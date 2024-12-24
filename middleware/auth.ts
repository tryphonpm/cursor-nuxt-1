export default defineNuxtRouteMiddleware((to) => {
  const user = useState('user');
  const publicRoutes = ['/login', '/register'];

  if (user.value && publicRoutes.includes(to.path)) {
    return navigateTo('/');
  }

  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login');
  }
});
