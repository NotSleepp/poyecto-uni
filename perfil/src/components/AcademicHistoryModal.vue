<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="goBack" class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Historial Académico</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Seguimiento de tu progreso académico</p>
      </div>
    </div>

    <!-- Pestañas -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="py-4 px-1 relative font-medium text-sm transition-colors"
          :class="{
            'text-blue-600 dark:text-blue-400': activeTab === tab.id,
            'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300': activeTab !== tab.id
          }"
        >
          {{ tab.name }}
          <span
            class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"
            :class="activeTab === tab.id ? 'opacity-100' : 'opacity-0'"
          ></span>
        </button>
      </nav>
    </div>

    <!-- Contenido -->
    <div>
      <!-- Materias Aprobadas -->
      <div v-if="activeTab === 'approved'">
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div v-if="materiasAprobadas.length" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Materia</th>
                  <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Fecha</th>
                  <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Nota</th>
                  <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Condición</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="materia in materiasAprobadas" :key="materia.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td class="py-3 px-4 text-gray-900 dark:text-white font-medium">{{ materia.nombre }}</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">{{ formatDate(materia.fecha) }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-white font-medium">{{ materia.nota }}</td>
                  <td class="py-3 px-4">
                    <span 
                      class="px-2 py-1 rounded-full text-sm font-medium"
                      :class="{
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': materia.condicion === 'APROBADA',
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400': materia.condicion === 'EQUIVALENCIA'
                      }"
                    >
                      {{ materia.condicion }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Estado vacío -->
          <div v-else class="text-center py-16">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No hay materias aprobadas</h3>
            <p class="text-gray-500 dark:text-gray-400">Aún no se han registrado materias completadas</p>
          </div>
        </div>
      </div>

      <!-- Materias En Curso -->
      <div v-if="activeTab === 'inProgress'">
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div v-if="materiasEnCurso.length" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Materia</th>
                  <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Fecha Inscripción</th>
                  <th class="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="materia in materiasEnCurso" :key="materia.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td class="py-3 px-4 text-gray-900 dark:text-white font-medium">{{ materia.nombre }}</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-400">{{ formatDate(materia.fecha_inscripcion) }}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      {{ materia.estado }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Estado vacío -->
          <div v-else class="text-center py-16">
            <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No hay materias en curso</h3>
            <p class="text-gray-500 dark:text-gray-400">No tienes materias registradas en progreso</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import eventBus, { EventTypes } from 'host/eventBus';
import CareerCard from './CareerCard.vue';

const props = defineProps({ careerData: Object });

function goBack() {
  eventBus.emit(EventTypes.SHOW_MODAL, {
    title: 'Detalle de la Carrera',
    component: CareerCard,
    props: { carrera: props.careerData },
    hideActions: true
  });
}

const activeTab = ref('approved');
const tabs = [
  { id: 'approved', name: 'Materias Aprobadas' },
  { id: 'inProgress', name: 'Materias En Curso' }
];

const materiasAprobadas = ref([]);
const materiasEnCurso = ref([]);

const formatDate = (d) => d ? new Date(d).toLocaleDateString('es-AR') : 'No disponible';
</script>