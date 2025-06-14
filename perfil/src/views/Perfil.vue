<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header del perfil mejorado -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8 relative overflow-hidden">
        <!-- Patrón decorativo -->
        <div class="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
        
        <div class="relative flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Avatar mejorado con editor -->
          <div class="relative group">
            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
              <img :src="userAvatar" alt="avatar" class="w-full h-full object-cover" />
            </div>
            
            <!-- Botón de editar avatar -->
            <button
              @click="openAvatarEditor"
              class="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center transition-all duration-200 group-hover:scale-110 transform shadow-lg hover:shadow-xl"
              title="Editar avatar"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            
            <!-- Indicador de estado online -->
            <div class="absolute -bottom-1 left-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-gray-800 flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          
          <div class="text-center md:text-left flex-1">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ datos.nombre }} {{ datos.apellido }}
            </h1>
            <div class="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0v2m4-2v2"/>
                </svg>
                <span>DNI: {{ datos.dni }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 9a2 2 0 002 2h8a2 2 0 002-2l-2-9"/>
                </svg>
                <span>{{ formatDate(datos.fecha_nac) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid de información mejorado -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Información Personal -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Información Personal</h2>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-600 dark:text-gray-400 font-medium">Estado Civil</span>
              <span class="text-gray-900 dark:text-white font-semibold">{{ datos.estado_civil }}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-600 dark:text-gray-400 font-medium">Nacionalidad</span>
              <span class="text-gray-900 dark:text-white font-semibold">{{ datos.nacionalidad }}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-600 dark:text-gray-400 font-medium">Lugar de Nacimiento</span>
              <span class="text-gray-900 dark:text-white font-semibold">{{ datos.localidad_nacimiento }}, {{ datos.provincia_nacimiento }}</span>
            </div>
          </div>
        </div>

        <!-- Información de Contacto -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Información de Contacto</h2>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-600 dark:text-gray-400 font-medium">Email</span>
              <span class="text-gray-900 dark:text-white font-semibold">{{ datos.mail }}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-600 dark:text-gray-400 font-medium">Teléfono</span>
              <span class="text-gray-900 dark:text-white font-semibold">{{ datos.telefono }}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-600 dark:text-gray-400 font-medium">Celular</span>
              <span class="text-gray-900 dark:text-white font-semibold">{{ datos.celular }}</span>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-600 dark:text-gray-400 font-medium block mb-1">Dirección</span>
              <span class="text-gray-900 dark:text-white font-semibold">
                {{ datos.calle }} {{ datos.num_calle }} 
                {{ datos.piso ? `Piso ${datos.piso}` : '' }} 
                {{ datos.dto ? `Dto ${datos.dto}` : '' }}
              </span>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ datos.localidad_residente }}, {{ datos.provincia_residente }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carreras -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Mis Carreras</h2>
        </div>
        
        <div class="grid gap-4">
          <div 
            v-for="c in datos.carreras" 
            :key="c.pkinscripcion_carrera" 
            @click="verCarrera(c)" 
            class="group border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-start gap-4">
                  <div class="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {{ c.carrera_bis }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Facultad: {{ c.facultad }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Legajo: {{ c.legajo }}</p>
                    
                    <div class="flex flex-wrap gap-2">
                      <span 
                        class="px-3 py-1 text-xs font-medium rounded-full"
                        :class="{
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': c.condicion_academica === 'ACTIVO',
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400': c.condicion_academica === 'INACTIVO',
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400': c.condicion_academica === 'GRADUADO'
                        }"
                      >
                        {{ c.condicion_academica }}
                      </span>
                      <span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                        {{ c.condicion_tesorera }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="text-right flex flex-col items-end gap-3">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  <p>Plan {{ c.anio_plan }}</p>
                  <p>Sede {{ c.sede }}</p>
                </div>
                <ProgressCircle :percent="c.academicPercent || 0" :size="60" :color="'#2563eb'" />
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
import ProgressCircle from '../components/ProgressCircle.vue';
import AvatarEditor from '../components/AvatarEditor.vue';

const userStore = useUserStore();
const careerStore = useCareerStore();

console.log('[Perfil] Componente setup ejecutado');

const datos = ref({});
const userAvatar = ref('https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&facialHairType=BeardMedium&clotheType=Hoodie&eyeType=Wink');

const formatDate = (d) => d ? new Date(d).toLocaleDateString('es-AR') : '';

function verCarrera(c) {
  careerStore.setSelectedCareer(c);
  eventBus.emit(EventTypes.SHOW_MODAL, { 
    title: 'Detalle de la Carrera', 
    component: CareerCard, 
    props: { carrera: c }, 
    hideActions: true 
  });
}

function openAvatarEditor() {
  console.log('[Perfil] Emitiendo SHOW_MODAL para AvatarEditor');
  eventBus.emit(EventTypes.SHOW_MODAL, {
    title: 'Personalizar Avatar',
    component: AvatarEditor,
    props: {},
    hideActions: true
  });
}

// Escuchar para confirmar recepción del host (solo debug)
eventBus.on(EventTypes.SHOW_MODAL, (payload) => {
  console.log('[Perfil] Evento SHOW_MODAL detectado (eco)', payload);
});

watch(() => userStore.user, (n) => { 
  if (n) datos.value = n; 
}, { immediate: true });

onMounted(async () => {
  console.log('[Perfil] onMounted');
  // Cargar avatar desde localStorage
  const savedAvatar = localStorage.getItem('userAvatar');
  if (savedAvatar) {
    userAvatar.value = savedAvatar;
  }
  
  await userStore.fetchUserProfile();
  await careerStore.fetchCareers();
  
  if (careerStore.careers) {
    for (const carrera of careerStore.careers) {
      try {
        await careerStore.fetchAcademicProgress(carrera.pkinscripcion_carrera);
        const prog = careerStore.academicProgress;
        if (prog && prog.total_materias > 0) {
          carrera.academicPercent = Math.round((prog.materias_aprobadas / prog.total_materias) * 100);
        } else {
          carrera.academicPercent = 0;
        }
      } catch (error) {
        carrera.academicPercent = 0;
      }
    }
  }
  
  // Escuchar actualizaciones del avatar
  eventBus.on('avatar-updated', (newAvatarUrl) => {
    userAvatar.value = newAvatarUrl;
  });
  console.log('[Perfil] onMounted finalizado');
});

// Escuchar cambios en localStorage para actualizar avatar
window.addEventListener('storage', (e) => {
  if (e.key === 'userAvatar' && e.newValue) {
    userAvatar.value = e.newValue;
  }
});
</script>