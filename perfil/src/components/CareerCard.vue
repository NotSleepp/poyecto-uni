<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-blue-600 rounded-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {{ carrera.carrera_bis }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Facultad: {{ carrera.facultad }}
          </p>
        </div>
      </div>
      
      <span :class="getStatusClass(carrera.condicion_academica)" class="px-3 py-1 rounded-full text-sm font-medium">
        {{ carrera.condicion_academica }}
      </span>
    </div>

    <!-- Grid de información -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Legajo</p>
        <p class="font-semibold text-gray-900 dark:text-white">{{ carrera.legajo }}</p>
      </div>
      <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Sede</p>
        <p class="font-semibold text-gray-900 dark:text-white">{{ carrera.sede }}</p>
      </div>
      <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Plan</p>
        <p class="font-semibold text-gray-900 dark:text-white">{{ carrera.anio_plan }}</p>
      </div>
      <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Matrícula</p>
        <p class="font-semibold text-gray-900 dark:text-white">{{ carrera.matricula }}</p>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Condición Tesorería</p>
        <p class="font-medium text-gray-900 dark:text-white">{{ carrera.condicion_tesorera }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Fecha Inscripción</p>
        <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(carrera.fecha_inscripcion) }}</p>
      </div>
    </div>

    <!-- Progreso - siempre visible -->
    <div class="mb-6">
      <CareerProgressCard 
        :total="progress?.total_materias || 0" 
        :aprobadas="progress?.materias_aprobadas || 0" 
        :promedio="progress?.promedio || 0" 
      />
    </div>

    <!-- Título de pregrado -->
    <div v-if="carrera.titulo_pregrado" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <p class="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Título de Pregrado</p>
      <p class="font-semibold text-gray-900 dark:text-white">{{ carrera.titulo_pregrado }}</p>
    </div>

    <!-- Botones -->
    <div class="flex flex-col sm:flex-row gap-3">
      <button
        @click="showAcademicHistory"
        class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Historial Académico
      </button>
      <button
        @click="showDocumentation"
        class="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Documentación
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, onMounted } from 'vue';
import eventBus, { EventTypes } from 'host/eventBus';
import AcademicHistoryModal from './AcademicHistoryModal.vue';
import DocumentationModal from './DocumentationModal.vue';
import CareerProgressCard from './CareerProgressCard.vue';
import { useCareerStore } from '../stores/careerStore';

const props = defineProps({
  carrera: {
    type: Object,
    required: true
  }
});

const careerStore = useCareerStore();
const progress = computed(() => careerStore.academicProgress);

const showAcademicHistory = () => {
  eventBus.emit(EventTypes.SHOW_MODAL, {
    title: 'Historial Académico',
    component: AcademicHistoryModal,
    props: { careerData: props.carrera },
    hideActions: true
  });
};

const showDocumentation = () => {
  eventBus.emit(EventTypes.SHOW_MODAL, {
    title: 'Documentación',
    component: DocumentationModal,
    props: { careerData: props.carrera },
    hideActions: true
  });
};

const getStatusClass = (status) => {
  const classes = {
    ACTIVO: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    INACTIVO: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    GRADUADO: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  };
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-AR');

onMounted(async () => {
  if (props.carrera?.pkinscripcion_carrera) {
    await careerStore.fetchAcademicProgress(props.carrera.pkinscripcion_carrera);
  }
});
</script>