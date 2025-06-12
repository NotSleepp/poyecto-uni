import { defineStore } from 'pinia';
import { useSharedStore } from './sharedStore';

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
      const sharedStore = useSharedStore();
      if (!sharedStore.token) return;

      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`${API_URL}/user/carreras`, {
          headers: {
            'Authorization': `Bearer ${sharedStore.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener carreras');
        }

        const data = await response.json();
        if (data.estado && data.datos) {
          this.careers = data.datos;
        } else {
          throw new Error(data.mensaje || 'Error al obtener carreras');
        }
      } catch (error) {
        console.error('Error al obtener carreras:', error);
        this.error = error.message;
        this.careers = [];
      } finally {
        this.isLoading = false;
      }
    },

    async selectCareer(pkinscripcion_carrera) {
      const sharedStore = useSharedStore();
      if (!sharedStore.token) return;

      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`${API_URL}/user/carrera`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sharedStore.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });

        if (!response.ok) {
          throw new Error('Error al seleccionar carrera');
        }

        const data = await response.json();
        if (data.estado) {
          this.selectedCareer = this.careers.find(c => c.pkinscripcion_carrera === pkinscripcion_carrera);
          await this.fetchAcademicProgress(pkinscripcion_carrera);
          await this.fetchCoursedSubjects(pkinscripcion_carrera);
          await this.fetchDocumentation(pkinscripcion_carrera);
        } else {
          throw new Error(data.mensaje || 'Error al seleccionar carrera');
        }
      } catch (error) {
        console.error('Error al seleccionar carrera:', error);
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAcademicProgress(pkinscripcion_carrera) {
      const sharedStore = useSharedStore();
      if (!sharedStore.token) return;

      try {
        const response = await fetch(`${API_URL}/perfil/progresoAcademico`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sharedStore.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });

        if (!response.ok) {
          throw new Error('Error al obtener progreso académico');
        }

        const data = await response.json();
        if (data.estado && data.datos) {
          this.academicProgress = data.datos;
        }
      } catch (error) {
        console.error('Error al obtener progreso académico:', error);
      }
    },

    async fetchCoursedSubjects(pkinscripcion_carrera) {
      const sharedStore = useSharedStore();
      if (!sharedStore.token) return;

      try {
        const response = await fetch(`${API_URL}/perfil/materiasCursadas`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sharedStore.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });

        if (!response.ok) {
          throw new Error('Error al obtener materias cursadas');
        }

        const data = await response.json();
        if (data.estado && data.datos) {
          this.coursedSubjects = data.datos.materias;
        }
      } catch (error) {
        console.error('Error al obtener materias cursadas:', error);
      }
    },

    async fetchDocumentation(pkinscripcion_carrera) {
      const sharedStore = useSharedStore();
      if (!sharedStore.token) return;

      try {
        const response = await fetch(`${API_URL}/perfil/documentacion`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sharedStore.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pkinscripcion_carrera })
        });

        if (!response.ok) {
          throw new Error('Error al obtener documentación');
        }

        const data = await response.json();
        if (data.estado && data.datos) {
          this.documentation = data.datos;
        }
      } catch (error) {
        console.error('Error al obtener documentación:', error);
      }
    },

    clearCareerData() {
      this.selectedCareer = null;
      this.academicProgress = null;
      this.coursedSubjects = [];
      this.documentation = null;
    }
  }
}); 