<template>
  <BaseCard>
    <template #header>
      <div class="flex items-center gap-3">
        <div class="p-2 bg-blue-600 rounded-lg">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white">Progreso Académico</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">Tu avance en la carrera</p>
        </div>
      </div>
    </template>
    
    <div class="flex items-center gap-6">
      <!-- Círculo de progreso simple -->
      <ProgressCircle :percent="percent" :size="100" :color="'#2563eb'" />
      
      <div class="flex-1 space-y-4">
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-sm font-medium text-green-700 dark:text-green-300">Materias Aprobadas</span>
          </div>
          <p class="text-xl font-bold text-green-800 dark:text-green-200">
            {{ aprobadas || 0 }} / {{ total || 0 }}
          </p>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Promedio General</span>
          </div>
          <p class="text-xl font-bold text-blue-800 dark:text-blue-200">{{ promedio || '--' }}</p>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue';
import ProgressCircle from './ProgressCircle.vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  total: Number,
  aprobadas: Number,
  promedio: Number
});

// Cálculo simple sin animaciones complicadas
const percent = computed(() => {
  if (!props.total || props.total === 0) return 0;
  if (!props.aprobadas) return 0;
  return Math.round((props.aprobadas / props.total) * 100);
});
</script>