<!-- Vista de documentación -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <!-- Encabezado -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Documentación
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {{ careerStore.selectedCareer?.carrera }}
            </p>
          </div>
          <router-link 
            :to="{ name: 'CareerDetails' }" 
            class="inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Volver
          </router-link>
        </div>
      </div>

      <!-- Resumen de documentación -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 dark:bg-green-900/40 rounded-full p-3">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Documentos Completos</h2>
                <p class="text-3xl font-bold text-green-600 dark:text-green-400">
                  {{ documentationStore.totalComplete }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/40 rounded-full p-3">
                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Documentos Pendientes</h2>
                <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {{ documentationStore.totalPending }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-100 dark:bg-blue-900/40 rounded-full p-3">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Total Requeridos</h2>
                <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {{ documentationStore.totalRequired }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de documentos -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div v-if="documentationStore.isLoading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3d4e6c]"></div>
        </div>

        <div v-else-if="documentationStore.error" class="p-6 text-red-500 dark:text-red-400">
          {{ documentationStore.error }}
        </div>

        <div v-else>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Documento
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Requerido
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="doc in documentationStore.documents" :key="doc.nombre" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ doc.nombre }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(doc.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ doc.estado }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ doc.requerido ? 'Sí' : 'No' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCareerStore } from '../stores/careerStore';
import { useDocumentationStore } from '../stores/documentationStore';

const careerStore = useCareerStore();
const documentationStore = useDocumentationStore();

// Obtener clase CSS según estado
const getStatusClass = (status) => {
  const classes = {
    'Completo': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'Pendiente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    'No requerido': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

onMounted(async () => {
  if (careerStore.selectedCareer?.pkinscripcion_carrera) {
    await documentationStore.fetchDocumentation(careerStore.selectedCareer.pkinscripcion_carrera);
  }
});
</script> 