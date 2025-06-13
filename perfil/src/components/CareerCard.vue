<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ carrera.carrera_bis }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Facultad: {{ carrera.facultad }}
        </p>
      </div>
      <span :class="getStatusClass(carrera.condicion_academica)" class="px-3 py-1 rounded-full text-sm font-medium">
        {{ carrera.condicion_academica }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Legajo</p>
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ carrera.legajo }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Sede</p>
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ carrera.sede }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Plan</p>
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ carrera.anio_plan }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Matrícula</p>
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ carrera.matricula }}</p>
      </div>
    </div>

    <div class="border-t pt-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Condición Tesorería</p>
          <p class="font-medium text-gray-800 dark:text-gray-200">{{ carrera.condicion_tesorera }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Fecha Inscripción</p>
          <p class="font-medium text-gray-800 dark:text-gray-200">
            {{ formatDate(carrera.fecha_inscripcion) }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="carrera.titulo_pregrado" class="mt-4 pt-4 border-t">
      <p class="text-sm text-gray-600 dark:text-gray-400">Título de Pregrado</p>
      <p class="font-medium text-gray-800 dark:text-gray-200">{{ carrera.titulo_pregrado }}</p>
    </div>

    <!-- Botones de Acción -->
    <div class="mt-6 flex space-x-4">
      <button
        @click="showAcademicHistory"
        class="flex-1 px-4 py-2 bg-[#3d4e6c] dark:bg-[#7389ae] text-white rounded-lg hover:bg-[#2c3b53] dark:hover:bg-[#5a6d8f] transition-colors duration-200"
      >
        Historial Académico
      </button>
      <button
        @click="showDocumentation"
        class="flex-1 px-4 py-2 bg-[#3d4e6c] dark:bg-[#7389ae] text-white rounded-lg hover:bg-[#2c3b53] dark:hover:bg-[#5a6d8f] transition-colors duration-200"
      >
        Documentación
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import eventBus, { EventTypes } from 'host/eventBus';
import AcademicHistoryModal from './AcademicHistoryModal.vue';
import DocumentationModal from './DocumentationModal.vue';

const props = defineProps({
  carrera: {
    type: Object,
    required: true
  }
});

const showAcademicHistory = () => {
  const bus = (globalThis.__central_event_bus__?.eventBus) || eventBus;
  bus.emit(EventTypes.SHOW_MODAL, {
    title: 'Historial Académico',
    component: AcademicHistoryModal,
    props: {
      careerData: props.carrera
    },
    hideActions: true
  });
};

const showDocumentation = () => {
  const bus = (globalThis.__central_event_bus__?.eventBus) || eventBus;
  bus.emit(EventTypes.SHOW_MODAL, {
    title: 'Documentación',
    component: DocumentationModal,
    props: {
      careerData: props.carrera
    },
    hideActions: true
  });
};

const getStatusClass = (status) => {
  const classes = {
    'ACTIVO': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'INACTIVO': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'GRADUADO': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  };
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};
</script> 