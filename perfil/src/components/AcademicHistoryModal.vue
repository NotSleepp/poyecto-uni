<!-- Modal de Historial Académico -->
<template>
  <div class="space-y-6">
    <!-- Pestañas -->
    <div class="border-b border-gray-200 dark:border-[#2c3b53]">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="py-4 px-1 relative"
          :class="{
            'text-[#3d4e6c] dark:text-[#7389ae]': activeTab !== tab.id,
            'text-[#2c3b53] dark:text-[#f4f6f9] font-medium': activeTab === tab.id
          }"
        >
          {{ tab.name }}
          <span 
            class="absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-200"
            :class="{
              'bg-[#3d4e6c] dark:bg-[#7389ae] scale-x-100': activeTab === tab.id,
              'scale-x-0': activeTab !== tab.id
            }"
          ></span>
        </button>
      </nav>
    </div>

    <!-- Contenido de las Pestañas -->
    <div>
      <!-- Materias Aprobadas -->
      <div v-if="activeTab === 'approved'" class="space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-[#2c3b53]">
                <th class="text-left py-3 px-4 text-[#5a6d8f] dark:text-[#7389ae] font-medium">Materia</th>
                <th class="text-left py-3 px-4 text-[#5a6d8f] dark:text-[#7389ae] font-medium">Fecha</th>
                <th class="text-left py-3 px-4 text-[#5a6d8f] dark:text-[#7389ae] font-medium">Nota</th>
                <th class="text-left py-3 px-4 text-[#5a6d8f] dark:text-[#7389ae] font-medium">Condición</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="materia in materiasAprobadas" 
                :key="materia.id"
                class="border-b border-gray-100 dark:border-[#2c3b53] last:border-0"
              >
                <td class="py-3 px-4 text-[#2c3b53] dark:text-[#f4f6f9]">{{ materia.nombre }}</td>
                <td class="py-3 px-4 text-[#2c3b53] dark:text-[#f4f6f9]">{{ formatDate(materia.fecha) }}</td>
                <td class="py-3 px-4 text-[#2c3b53] dark:text-[#f4f6f9]">{{ materia.nota }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2 py-1 rounded-full text-sm"
                    :class="{
                      'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400': materia.condicion === 'APROBADA',
                      'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400': materia.condicion === 'EQUIVALENCIA'
                    }"
                  >
                    {{ materia.condicion }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Materias En Curso -->
      <div v-if="activeTab === 'inProgress'" class="space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-[#2c3b53]">
                <th class="text-left py-3 px-4 text-[#5a6d8f] dark:text-[#7389ae] font-medium">Materia</th>
                <th class="text-left py-3 px-4 text-[#5a6d8f] dark:text-[#7389ae] font-medium">Fecha Inscripción</th>
                <th class="text-left py-3 px-4 text-[#5a6d8f] dark:text-[#7389ae] font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="materia in materiasEnCurso" 
                :key="materia.id"
                class="border-b border-gray-100 dark:border-[#2c3b53] last:border-0"
              >
                <td class="py-3 px-4 text-[#2c3b53] dark:text-[#f4f6f9]">{{ materia.nombre }}</td>
                <td class="py-3 px-4 text-[#2c3b53] dark:text-[#f4f6f9]">{{ formatDate(materia.fecha_inscripcion) }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-1 rounded-full text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
                    {{ materia.estado }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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

const activeTab = ref('approved');
const tabs = [
  { id: 'approved', name: 'Materias Aprobadas' },
  { id: 'inProgress', name: 'Materias En Curso' }
];

const materiasAprobadas = ref([
  // Aquí irían los datos de materias aprobadas
]);

const materiasEnCurso = ref([
  // Aquí irían los datos de materias en curso
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
</script> 