<!-- Vista de detalles de la carrera -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <!-- Encabezado de la carrera -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ careerStore.selectedCareer?.carrera }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Plan: {{ careerStore.selectedCareer?.anio_plan }}
            </p>
          </div>
          <div class="flex gap-4">
            <router-link 
              :to="{ name: 'AcademicHistory' }" 
              class="inline-flex items-center px-4 py-2 bg-[#3d4e6c] text-white rounded-lg hover:bg-[#2c3b53] transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Historial Académico
            </router-link>
            <router-link 
              :to="{ name: 'Documentation' }" 
              class="inline-flex items-center px-4 py-2 bg-[#3d4e6c] text-white rounded-lg hover:bg-[#2c3b53] transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Documentación
            </router-link>
          </div>
        </div>
      </div>

      <!-- Progreso Académico -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-[#3d4e6c] dark:text-[#5a6d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Progreso Académico
          </h2>
          
          <div v-if="careerStore.isLoading" class="flex justify-center items-center h-32">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3d4e6c]"></div>
          </div>
          
          <div v-else-if="careerStore.error" class="text-red-500 dark:text-red-400">
            {{ careerStore.error }}
          </div>
          
          <div v-else class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Materias Aprobadas</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ careerStore.academicProgress?.materias_aprobadas }} / {{ careerStore.academicProgress?.total_materias }}
              </span>
            </div>
            
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                class="bg-[#3d4e6c] h-2.5 rounded-full transition-all duration-500"
                :style="{ width: `${careerStore.progressPercentage}%` }"
              ></div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Promedio General</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ careerStore.academicProgress?.promedio }}
              </span>
            </div>
          </div>
        </div>

        <!-- Documentación Requerida -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-[#3d4e6c] dark:text-[#5a6d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Estado de Documentación
          </h2>
          
          <div v-if="documentationStore.isLoading" class="flex justify-center items-center h-32">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3d4e6c]"></div>
          </div>
          
          <div v-else-if="documentationStore.error" class="text-red-500 dark:text-red-400">
            {{ documentationStore.error }}
          </div>
          
          <div v-else class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Documentos Completos</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ documentationStore.totalComplete }} / {{ documentationStore.totalRequired }}
              </span>
            </div>
            
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                class="bg-[#3d4e6c] h-2.5 rounded-full transition-all duration-500"
                :style="{ width: `${documentationStore.completionPercentage}%` }"
              ></div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Documentos Pendientes</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ documentationStore.totalPending }}
              </span>
            </div>
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

onMounted(async () => {
  if (careerStore.selectedCareer?.pkinscripcion_carrera) {
    await Promise.all([
      careerStore.fetchAcademicProgress(),
      documentationStore.fetchDocumentation(careerStore.selectedCareer.pkinscripcion_carrera)
    ]);
  }
});
</script> 