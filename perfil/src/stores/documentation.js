import { defineStore } from "pinia";

export const useDocumentationStore = defineStore("documentation", {
  state: () => ({
    documents: [],
    cantidadDocumentosAdeudados: 0,
  }),
  actions: {
    setDocuments(documents) {
      this.documents = documents;
    },
    setCantidadDocumentosAdeudados(cantidad) {
      this.cantidadDocumentosAdeudados = cantidad;
    },
  },
});
