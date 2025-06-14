import { defineStore } from 'pinia';

// Store de autenticación local (fallback cuando el host remoto no expone ./authStore)
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
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