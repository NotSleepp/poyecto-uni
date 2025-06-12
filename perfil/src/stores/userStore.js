import { defineStore } from 'pinia';
import { useSharedStore } from './sharedStore';

const API_URL = 'https://backend.autogestion.atlantida.edu.ar/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null,
    isLoading: false,
    error: null
  }),

  getters: {
    user: (state) => state.userData,
    isAuthenticated: () => {
      const sharedStore = useSharedStore();
      return sharedStore.isAuthenticated;
    }
  },

  actions: {
    async fetchUserProfile() {
      const sharedStore = useSharedStore();
      if (!sharedStore.token) return;

      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`${API_URL}/perfil/datosPersonales`, {
          headers: {
            'Authorization': `Bearer ${sharedStore.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener perfil de usuario');
        }

        const data = await response.json();
        if (data.estado && data.datos) {
          this.userData = data.datos;
        } else {
          throw new Error(data.mensaje || 'Error al obtener datos del perfil');
        }
      } catch (error) {
        console.error('Error al obtener perfil:', error);
        this.error = error.message;
        this.userData = null;
      } finally {
        this.isLoading = false;
      }
    },

    clearUserData() {
      this.userData = null;
      this.error = null;
    }
  }
}); 