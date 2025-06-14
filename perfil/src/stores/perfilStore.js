import { defineStore } from 'pinia';
import { apiFetch } from '../utils/api';

export const usePerfilStore = defineStore('perfil', {
  state: () => ({
    datosPersonales: null,
    carreras: [],
    carreraSeleccionada: null,
    progreso: null,
    materiasCursadas: [],
    documentacion: null,
    cuentaCorriente: null,
  }),
  actions: {
    async fetchDatosPersonales() {
      this.datosPersonales = await apiFetch('/api/perfil/datosPersonales');
    },
    async fetchCarreras() {
      const res = await apiFetch('/api/user/carreras');
      this.carreras = res?.datos || [];
    },
    selectCarrera(matricula) {
      this.carreraSeleccionada = matricula;
    },
    async fetchProgreso() {
      if (!this.carreraSeleccionada) return;
      this.progreso = await apiFetch('/api/perfil/progresoAcademico', {
        method: 'POST',
        body: JSON.stringify({ pkinscripcion_carrera: this.carreraSeleccionada }),
      });
    },
    async fetchMaterias() {
      if (!this.carreraSeleccionada) return;
      const res = await apiFetch('/api/perfil/materiasCursadas', {
        method: 'POST',
        body: JSON.stringify({ pkinscripcion_carrera: this.carreraSeleccionada }),
      });
      this.materiasCursadas = res?.datos?.materias || [];
    },
    async fetchDocumentacion() {
      if (!this.carreraSeleccionada) return;
      this.documentacion = await apiFetch('/api/perfil/documentacion', {
        method: 'POST',
        body: JSON.stringify({ pkinscripcion_carrera: this.carreraSeleccionada }),
      });
    },
    async fetchCuentaCorriente() {
      if (!this.carreraSeleccionada) return;
      this.cuentaCorriente = await apiFetch('/api/cuentacorriente', {
        method: 'POST',
        body: JSON.stringify({ pkinscripcion_carrera: this.carreraSeleccionada }),
      });
    }
  }
}); 