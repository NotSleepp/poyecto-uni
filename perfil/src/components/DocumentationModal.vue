<!-- Modal de Documentación -->
<template>
  <div class="space-y-6">
    <!-- Lista de Documentos -->
    <div class="grid grid-cols-1 gap-4">
      <div 
        v-for="documento in documentos" 
        :key="documento.id"
        class="bg-white dark:bg-[#2c3b53] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-medium text-[#2c3b53] dark:text-[#f4f6f9] mb-1">
              {{ documento.nombre }}
            </h3>
            <p class="text-sm text-[#5a6d8f] dark:text-[#7389ae] mb-2">
              {{ documento.descripcion }}
            </p>
            <div class="flex items-center space-x-4 text-sm">
              <span class="text-[#5a6d8f] dark:text-[#7389ae]">
                Fecha: {{ formatDate(documento.fecha) }}
              </span>
              <span 
                :class="{
                  'text-green-600 dark:text-green-400': documento.estado === 'APROBADO',
                  'text-yellow-600 dark:text-yellow-400': documento.estado === 'PENDIENTE',
                  'text-red-600 dark:text-red-400': documento.estado === 'RECHAZADO'
                }"
              >
                Estado: {{ documento.estado }}
              </span>
            </div>
          </div>
          
          <!-- Botón de Descarga -->
          <button
            v-if="documento.url"
            @click="descargarDocumento(documento)"
            class="ml-4 p-2 text-[#3d4e6c] dark:text-[#7389ae] hover:text-[#2c3b53] dark:hover:text-[#f4f6f9] transition-colors"
            title="Descargar documento"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>

        <!-- Comentarios o Notas -->
        <div v-if="documento.comentarios" class="mt-3 p-3 bg-gray-50 dark:bg-[#1a2234] rounded-lg">
          <p class="text-sm text-[#5a6d8f] dark:text-[#7389ae]">
            {{ documento.comentarios }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  careerData: {
    type: Object,
    required: true
  }
});

const documentos = ref([
  // Aquí irían los documentos de la carrera
]);

const formatDate = (dateString) => {
  if (!dateString) return 'No disponible';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const descargarDocumento = (documento) => {
  // Implementar lógica de descarga
  console.log('Descargando documento:', documento.nombre);
};
</script> 