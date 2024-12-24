export default defineEventHandler((event) => {
  deleteCookie(event, 'auth_token', {
    path: '/',
  });

  return {
    message: 'Déconnecté avec succès',
  };
});
