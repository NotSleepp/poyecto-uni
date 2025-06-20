<template>
  <div class="max-w-2xl mx-auto">
    <BaseCard wrapper-class="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/30">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-pink-500/10 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
      
      <div class="relative p-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <AcademicCapIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Selección de Carrera
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            Seleccione la carrera para la cual desea consultar su cuenta corriente académica
          </p>
        </div>
        
        <!-- Loading State con skeleton mejorado -->
        <div v-if="isLoading" class="space-y-6 animate-fadeIn">
          <!-- Skeleton para el selector -->
          <div class="animate-pulse">
            <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-3"></div>
            <div class="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          </div>
          
          <!-- Skeleton para el botón -->
          <div class="animate-pulse">
            <div class="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl w-40"></div>
          </div>
          
          <!-- Indicador de carga central -->
          <div class="flex items-center justify-center py-8">
            <div class="flex flex-col items-center space-y-3">
              <div class="relative">
                <div class="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 dark:border-slate-700"></div>
                <div class="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <p class="text-slate-600 dark:text-slate-400 font-medium text-sm">Cargando carreras...</p>
            </div>
          </div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-6 mb-6">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-red-800 dark:text-red-200 font-medium text-sm mb-1">Error al cargar carreras</h3>
              <p class="text-red-700 dark:text-red-300 text-sm">{{ error }}</p>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="careers.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-slate-800 dark:text-slate-200 font-medium mb-2">No hay carreras disponibles</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm">No se encontraron carreras asociadas a su cuenta</p>
        </div>
        
        <!-- Career Selection -->
        <div v-else class="space-y-6 animate-slideInUp">
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 animate-slideInLeft">
              Carrera Académica
            </label>
            <div class="relative">
              <select 
                v-model="selectedCareerPk"
                class="w-full px-4 py-4 pr-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 animate-scaleIn"
              >
                <option value="" disabled class="text-slate-500">Seleccione una carrera</option>
                <option 
                  v-for="career in careers" 
                  :key="career.pkinscripcion_carrera" 
                  :value="career.pkinscripcion_carrera"
                  class="py-2"
                >
                  {{ career.carrera }} - {{ career.condicion_academica }} ({{ career.legajo }})
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Action Button -->
          <div class="flex justify-center pt-4">
            <button 
              @click="selectCareer"
              :disabled="!selectedCareerPk || isSelecting"
              :class="[
                'group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 min-w-[180px] justify-center animate-scaleIn',
                !selectedCareerPk || isSelecting
                  ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed scale-95 shadow-sm'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 focus:ring-blue-500 active:scale-95'
              ]"
            >
              <div v-if="isSelecting" class="flex items-center gap-3">
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Seleccionando...</span>
              </div>
              <div v-else class="flex items-center gap-3">
                <AcademicCapIcon class="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Continuar</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { AcademicCapIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '../stores/authStore';
import BaseCard from './BaseCard.vue';
import eventBus, { EventTypes } from 'host/eventBus';

// Usar el mismo enfoque que los otros componentes para las llamadas API
import { apiFetch } from '../utils/api';
const authStore = useAuthStore();

const careers = ref([]);
const selectedCareerPk = ref('');
const isLoading = ref(false);
const isSelecting = ref(false);
const error = ref(null);

onMounted(async () => {
  await fetchCareers();
});

async function fetchCareers() {
  const token = authStore.token;
  if (!token) {
    error.value = 'No hay token de autenticación disponible';
    return;
  }
  
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await apiFetch('/user/carreras', {
      method: 'GET'
    });
    
    careers.value = response;
  } catch (e) {
    console.error('Error al obtener carreras:', e);
    error.value = e.message || 'Error al obtener las carreras';
  } finally {
    isLoading.value = false;
  }
}

async function selectCareer() {
  if (!selectedCareerPk.value) return;
  
  const token = authStore.token;
  if (!token) {
    error.value = 'No hay token de autenticación disponible';
    return;
  }
  
  isSelecting.value = true;
  error.value = null;
  
  try {
    // Usar apiFetch para manejar la selección de carrera
    const response = await apiFetch('/user/carrera', {
      method: 'POST',
      body: JSON.stringify({ pkinscripcion_carrera: selectedCareerPk.value })
    });
    
    // Emitir evento de éxito
    eventBus.emit(EventTypes.SUCCESS, {
      message: 'Carrera seleccionada correctamente',
      timestamp: new Date().toISOString()
    });
    
    // Emitir evento para recargar los datos
    eventBus.emit(EventTypes.DATA_UPDATED, {
      type: 'career-selected',
      timestamp: new Date().toISOString()
    });
    
  } catch (e) {
    console.error('Error al seleccionar carrera:', e);
    error.value = e.message || 'Error al seleccionar la carrera';
    
    // Emitir evento de error
    eventBus.emit(EventTypes.ERROR, {
      message: error.value,
      timestamp: new Date().toISOString()
    });
  } finally {
    isSelecting.value = false;
  }
}
</script>

<style scoped>
/* Animaciones para CareerSelector */
.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slideInUp {
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slideInLeft {
  animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-scaleIn {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Skeleton pulse mejorado */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>