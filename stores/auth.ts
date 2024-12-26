import { defineStore } from 'pinia';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
      this.isAuthenticated = true;
      // Stockage du token dans un cookie sécurisé
      const cookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        secure: true,
        sameSite: 'strict',
      });
      cookie.value = token;
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      const cookie = useCookie('auth_token');
      cookie.value = null;
    },

    async register(userData: RegisterData) {
      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: userData,
        });

        if (response.success) {
          // Connecter automatiquement l'utilisateur après l'inscription
          const loginResponse = await this.login(userData.email, userData.password);
          return loginResponse;
        }
        throw new Error(response.message || "Erreur lors de l'inscription");
      } catch (error: any) {
        console.error("Erreur d'inscription:", error);
        throw new Error(error.data?.message || "Erreur lors de l'inscription");
      }
    },

    async login(email: string, password: string) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        });

        if (response.token) {
          this.setToken(response.token);
          this.user = response.user;
          return true;
        }
        return false;
      } catch (error) {
        console.error('Erreur de connexion:', error);
        return false;
      }
    },

    async checkAuth() {
      try {
        const cookie = useCookie('auth_token');
        if (!cookie.value) {
          this.clearAuth();
          return false;
        }

        // Ajout des headers d'autorisation
        const response = await $fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${cookie.value}`,
          },
        });

        if (response.valid) {
          this.token = cookie.value;
          this.user = response.user;
          this.isAuthenticated = true;
          return true;
        } else {
          this.clearAuth();
          return false;
        }
      } catch (error) {
        console.error('Erreur de vérification:', error);
        this.clearAuth();
        return false;
      }
    },
  },
});
