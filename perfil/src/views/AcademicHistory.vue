<!-- Vista de historial académico -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <!-- Encabezado -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Historial Académico
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

      <!-- Tabla de materias -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div v-if="careerStore.isLoading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3d4e6c]"></div>
        </div>

        <div v-else-if="careerStore.error" class="p-6 text-red-500 dark:text-red-400">
          {{ careerStore.error }}
        </div>

        <div v-else>
          <!-- Filtros -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-4">
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Buscar materia..."
                class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3d4e6c] focus:border-transparent"
              />
              <select
                v-model="selectedYear"
                class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3d4e6c] focus:border-transparent"
              >
                <option value="">Todos los años</option>
                <option v-for="year in availableYears" :key="year" :value="year">
                  {{ year }}º Año
                </option>
              </select>
              <select
                v-model="selectedStatus"
                class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3d4e6c] focus:border-transparent"
              >
                <option value="">Todos los estados</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Cursando">Cursando</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>
          </div>

          <!-- Tabla -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Código
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Materia
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Año
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cuatrimestre
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nota
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="subject in filteredSubjects" :key="subject.id_materia" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ subject.codigo }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ subject.nombre_materia }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ subject.anio }}º
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ subject.cuatrimestre }}º
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ subject.nota_total || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(subject.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ subject.estado }}
                    </span>
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
import { ref, computed, onMounted } from 'vue';
import { useCareerStore } from '../stores/careerStore';

const careerStore = useCareerStore();
const searchTerm = ref('');
const selectedYear = ref('');
const selectedStatus = ref('');

// Obtener años disponibles
const availableYears = computed(() => {
  if (!careerStore.coursedSubjects.length) return [];
  const years = new Set(careerStore.coursedSubjects.map(subject => subject.anio));
  return Array.from(years).sort((a, b) => a - b);
});

// Filtrar materias
const filteredSubjects = computed(() => {
  return careerStore.coursedSubjects.filter(subject => {
    const matchesSearch = searchTerm.value === '' || 
      subject.nombre_materia.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      subject.codigo.toLowerCase().includes(searchTerm.value.toLowerCase());
    
    const matchesYear = selectedYear.value === '' || subject.anio === parseInt(selectedYear.value);
    const matchesStatus = selectedStatus.value === '' || subject.estado === selectedStatus.value;

    return matchesSearch && matchesYear && matchesStatus;
  });
});

// Obtener clase CSS según estado
const getStatusClass = (status) => {
  const classes = {
    'Aprobada': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'Cursando': 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    'Pendiente': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

onMounted(async () => {
  if (careerStore.selectedCareer?.pkinscripcion_carrera) {
    await careerStore.fetchCoursedSubjects();
  }
});
</script> 