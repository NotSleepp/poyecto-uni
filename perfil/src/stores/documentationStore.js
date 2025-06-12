import { defineStore } from 'pinia';
import { useSharedStore } from './sharedStore';

const API_URL = 'https://backend.autogestion.atlantida.edu.ar/api';

export const useDocumentationStore = defineStore('documentation', {
  state: () => ({
    documents: [],
    isLoading: false,
    error: null,
    summary: {
      totalDocuments: 0,
      pendingDocuments: 0,
      approvedDocuments: 0,
      rejectedDocuments: 0
    }
  }),

  getters: {
    getPendingDocuments: (state) => state.documents.filter(doc => doc.estado === 'pendiente'),
    getApprovedDocuments: (state) => state.documents.filter(doc => doc.estado === 'aprobado'),
    getRejectedDocuments: (state) => state.documents.filter(doc => doc.estado === 'rechazado'),
    getDocumentationStatus: (state) => ({
      ...state.summary,
      completionPercentage: state.summary.totalDocuments > 0 
        ? (state.summary.approvedDocuments / state.summary.totalDocuments) * 100 
        : 0
    })
  },

  actions: {
    async fetchDocuments() {
      const sharedStore = useSharedStore();
      if (!sharedStore.token) return;

      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`${API_URL}/perfil/documentacion`, {
          headers: {
            'Authorization': `Bearer ${sharedStore.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener documentación');
        }

        const data = await response.json();
        if (data.estado && data.datos) {
          this.documents = data.datos;
          this.updateSummary();
        } else {
          throw new Error(data.mensaje || 'Error al obtener documentación');
        }
      } catch (error) {
        console.error('Error al obtener documentación:', error);
        this.error = error.message;
        this.documents = [];
      } finally {
        this.isLoading = false;
      }
    },

    updateSummary() {
      this.summary = {
        totalDocuments: this.documents.length,
        pendingDocuments: this.documents.filter(doc => doc.estado === 'pendiente').length,
        approvedDocuments: this.documents.filter(doc => doc.estado === 'aprobado').length,
        rejectedDocuments: this.documents.filter(doc => doc.estado === 'rechazado').length
      };
    },

    clearDocumentation() {
      this.documents = [];
      this.error = null;
      this.summary = {
        totalDocuments: 0,
        pendingDocuments: 0,
        approvedDocuments: 0,
        rejectedDocuments: 0
      };
    }
  }
}); 