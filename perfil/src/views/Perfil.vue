<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <!-- Sección Superior: Foto de Perfil y Nombre -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <!-- Foto de Perfil -->
          <div class="relative">
            <div class="w-32 h-32 rounded-full border-4 border-[#3d4e6c] dark:border-[#5a6d8f] overflow-hidden bg-white dark:bg-gray-700">
              <img src="../assets/img/default-avatar.png" alt="Foto de perfil" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Información Básica -->
          <div class="text-center md:text-left">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {{ studentData.nombre }} {{ studentData.apellido }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              DNI: {{ studentData.dni }}
            </p>
          </div>
        </div>
      </div>

      <!-- Cards de Información -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Card de Información Personal -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-[#3d4e6c] dark:text-[#5a6d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Información Personal
          </h2>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Fecha Nac.:</span>
              <span class="text-gray-900 dark:text-white">{{ formatDate(studentData.fecha_nac) }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Estado Civil:</span>
              <span class="text-gray-900 dark:text-white">{{ studentData.estado_civil }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Nacionalidad:</span>
              <span class="text-gray-900 dark:text-white">{{ studentData.nacionalidad }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Lugar Nac.:</span>
              <span class="text-gray-900 dark:text-white">{{ studentData.localidad_nacimiento }}, {{ studentData.provincia_nacimiento }}</span>
            </div>
          </div>
        </div>

        <!-- Card de Información de Contacto -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-[#3d4e6c] dark:text-[#5a6d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Información de Contacto
          </h2>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Email:</span>
              <span class="text-gray-900 dark:text-white">{{ studentData.mail }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Teléfono:</span>
              <span class="text-gray-900 dark:text-white">{{ studentData.telefono }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Celular:</span>
              <span class="text-gray-900 dark:text-white">{{ studentData.celular }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Dirección:</span>
              <span class="text-gray-900 dark:text-white">
                {{ studentData.calle }} {{ studentData.num_calle }}
                {{ studentData.piso ? `Piso ${studentData.piso}` : '' }}
                {{ studentData.dto ? `Dto ${studentData.dto}` : '' }}
              </span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 dark:text-gray-400 w-32">Localidad:</span>
              <span class="text-gray-900 dark:text-white">{{ studentData.localidad_residente }}, {{ studentData.provincia_residente }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de Carreras -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg class="w-6 h-6 mr-2 text-[#3d4e6c] dark:text-[#5a6d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          </svg>
          Carreras
        </h2>
        
        <div class="space-y-4">
          <div v-for="(carrera, index) in studentData.carreras" :key="index" 
               @click="handleCareerClick(carrera)"
               class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200 cursor-pointer">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ carrera.carrera_bis }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Facultad: {{ carrera.facultad }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Legajo: {{ carrera.legajo }}
                </p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="{
                          'bg-green-100 text-green-800': carrera.condicion_academica === 'ACTIVO',
                          'bg-yellow-100 text-yellow-800': carrera.condicion_academica === 'INACTIVO',
                          'bg-blue-100 text-blue-800': carrera.condicion_academica === 'GRADUADO'
                        }">
                    {{ carrera.condicion_academica }}
                  </span>
                  <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {{ carrera.condicion_tesorera }}
                  </span>
                </div>
              </div>
              <div class="text-right text-sm text-gray-500 dark:text-gray-400">
                <p>Plan {{ carrera.anio_plan }}</p>
                <p>Sede {{ carrera.sede }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useCareerStore } from '../stores/careerStore';
import eventBus, { EventTypes } from 'host/eventBus';
import CareerCard from '../components/CareerCard.vue';

const userStore = useUserStore();
const careerStore = useCareerStore();

const studentData = ref({
  nombre: "",
  apellido: "",
  dni: "",
  fecha_nac: "",
  estado_civil: "",
  nacionalidad: "",
  localidad_nacimiento: "",
  provincia_nacimiento: "",
  mail: "",
  telefono: "",
  celular: "",
  calle: "",
  num_calle: "",
  piso: "",
  dto: "",
  localidad_residente: "",
  provincia_residente: "",
  carreras: []
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const handleCareerClick = (carrera) => {
  console.log('[Perfil] handleCareerClick carrera', carrera)
  careerStore.setSelectedCareer(carrera);
  const bus = (globalThis.__central_event_bus__?.eventBus) || eventBus;
  bus.emit(EventTypes.SHOW_MODAL, {
    title: 'Detalle de la Carrera',
    component: CareerCard,
    props: {
      carrera
    },
    hideActions: true
  });
};

// Observar cambios en el store
watch(() => userStore.user, (newUser) => {
  if (newUser) {
    studentData.value = newUser;
  }
}, { immediate: true });

onMounted(async () => {
  // Cargar datos del usuario al montar el componente
  await userStore.fetchUserProfile();
  if (userStore.user) {
    studentData.value = userStore.user;
  }
});
</script>

<style>
@import 'tailwindcss/base';
</style> 