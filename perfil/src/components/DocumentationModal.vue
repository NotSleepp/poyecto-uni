<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <button @click="goBack" class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Documentación Requerida</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Gestiona tus documentos académicos</p>
      </div>
    </div>

    <div v-if="documentos.length" class="space-y-3 max-h-80 overflow-y-auto">
      <div 
        v-for="doc in documentos" 
        :key="doc.nombre"
        class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <span class="font-medium text-gray-900 dark:text-white">{{ doc.nombre }}</span>
        </div>
        
        <span 
          :class="doc.estado === 'Completo' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'"
          class="px-3 py-1 rounded-full text-sm font-medium"
        >
          {{ doc.estado }}
        </span>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="text-center py-16">
      <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No hay documentos</h3>
      <p class="text-gray-500 dark:text-gray-400">No se encontraron documentos requeridos</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';
import { useCareerStore } from '../stores/careerStore';
import eventBus, { EventTypes } from 'host/eventBus';
import CareerCard from './CareerCard.vue';

const props = defineProps({ careerData: Object });
const careerStore = useCareerStore();
const documentos = computed(() => careerStore.documentation?.datos?.documentacion?.[0]?.documentos || []);

function goBack() {
  eventBus.emit(EventTypes.SHOW_MODAL, {
    title: 'Detalle de la Carrera',
    component: CareerCard,
    props: { carrera: props.careerData },
    hideActions: true
  });
}
</script>