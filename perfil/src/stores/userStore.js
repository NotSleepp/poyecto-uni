import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';

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
      const auth = useAuthStore();
      const token = auth.token?.value ?? auth.token;
      return !!token;
    }
  },

  actions: {
    async fetchUserProfile() {
      const auth = useAuthStore();
      const token = auth.token?.value ?? auth.token;
      if (!token) return;

      this.isLoading = true;
      this.error = null;

      try {
        console.log('[UserStore] Obteniendo datos personales...');
        const response = await fetch(`${API_URL}/perfil/datosPersonales`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Error al obtener perfil de usuario');

        const data = await response.json();
        if (data.estado && data.datos) {
          console.log('[UserStore] Datos personales recibidos', data.datos);
          this.userData = data.datos;
        } else {
          console.warn('[UserStore] Respuesta inesperada', data);
          throw new Error(data.mensaje || 'Error al obtener datos del perfil');
        }
      } catch (error) {
        console.error('[UserStore] Error al obtener perfil:', error);
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