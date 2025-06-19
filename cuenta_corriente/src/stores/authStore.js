import { defineStore } from 'pinia';
// Token de prueba pegado localmente. En producción, el host establecerá el token vía login.
import { token as fallbackToken } from '../token.js';

// Store de autenticación local (fallback cuando el host remoto no expone ./authStore)
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || fallbackToken,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    authHeader: (state) => state.token ? { Authorization: `Bearer ${state.token}` } : {},
  },
  actions: {
    setToken(token) {
      this.token = token;
      if (token) localStorage.setItem('token', token);
      else localStorage.removeItem('token');
    },
    logout() {
      this.setToken(null);
      this.user = null;
    },
    setUser(user) {
      this.user = user;
    },
  },
}); 