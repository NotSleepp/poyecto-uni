import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';

const API_URL = 'https://backend.autogestion.atlantida.edu.ar/api';

export const useCareerStore = defineStore('career', {
  state: () => ({
    careers: [],
    selectedCareer: null,
    isLoading: false,
    error: null,
    academicProgress: null,
    coursedSubjects: [],
    documentation: null
  }),

  getters: {
    hasSelectedCareer: (state) => !!state.selectedCareer,
    activeCareer: (state) => state.selectedCareer,
    allCareers: (state) => state.careers
  },

  actions: {
    async fetchCareers() {
      const auth = useAuthStore();
      const token = auth.token?.value ?? auth.token;
      if (!token) return;
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(`${API_URL}/user/carreras`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Error al obtener carreras');
        const data = await response.json();
        if (data.estado && data.datos) {
          this.careers = data.datos;
        } else {
          throw new Error(data.mensaje || 'Error al obtener carreras');
        }
      } catch (e) {
        console.error(e);
        this.error = e.message;
        this.careers = [];
      } finally {
        this.isLoading = false;
      }
    },

    async selectCareer(pkinscripcion_carrera) {
      const auth = useAuthStore();
      const token = auth.token?.value ?? auth.token;
      if (!token) return;
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(`${API_URL}/user/carrera`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });
        if (!response.ok) throw new Error('Error al seleccionar carrera');
        const data = await response.json();
        if (data.estado) {
          this.selectedCareer = this.careers.find(c => c.pkinscripcion_carrera === pkinscripcion_carrera);
          await this.fetchAcademicProgress(pkinscripcion_carrera);
          await this.fetchCoursedSubjects(pkinscripcion_carrera);
          await this.fetchDocumentation(pkinscripcion_carrera);
        } else {
          throw new Error(data.mensaje || 'Error al seleccionar carrera');
        }
      } catch (e) {
        console.error(e);
        this.error = e.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAcademicProgress(pkinscripcion_carrera) {
      const auth = useAuthStore();
      const token = auth.token?.value ?? auth.token;
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/perfil/progresoAcademico`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });
        if (!res.ok) throw new Error('Error al obtener progreso académico');
        const data = await res.json();
        if (data.estado && data.datos) this.academicProgress = data.datos;
      } catch (e) {
        console.error(e);
      }
    },

    async fetchCoursedSubjects(pkinscripcion_carrera) {
      const auth = useAuthStore();
      const token = auth.token?.value ?? auth.token;
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/perfil/materiasCursadas`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });
        if (!res.ok) throw new Error('Error al obtener materias cursadas');
        const data = await res.json();
        if (data.estado && data.datos) this.coursedSubjects = data.datos.materias;
      } catch (e) {
        console.error(e);
      }
    },

    async fetchDocumentation(pkinscripcion_carrera) {
      const auth = useAuthStore();
      const token = auth.token?.value ?? auth.token;
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/perfil/documentacion`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });
        if (!res.ok) throw new Error('Error al obtener documentación');
        const data = await res.json();
        if (data.estado && data.datos) this.documentation = data.datos;
      } catch (e) {
        console.error(e);
      }
    },

    clearCareerData() {
      this.selectedCareer = null;
      this.academicProgress = null;
      this.coursedSubjects = [];
      this.documentation = null;
    },

    setSelectedCareer(carrera) {
      this.selectedCareer = carrera;
    }
  }
}); 