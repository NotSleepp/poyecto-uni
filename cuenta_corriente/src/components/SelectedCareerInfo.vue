<template>
  <BaseCard wrapper-class="relative overflow-hidden bg-gradient-to-r from-white via-blue-50/20 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:border-slate-700/30 mb-6 animate-slideInUp hover-lift transition-smooth">
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/5 to-indigo-500/5 rounded-full blur-2xl"></div>
    
    <div class="relative p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- Icon with gradient background -->
          <div class="flex-shrink-0">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center animate-scaleIn hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
          </div>
          
          <!-- Career Information -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2 leading-tight animate-slideInLeft">
                  {{ careerInfo.carrera }}
                </h3>
                <div class="flex flex-wrap items-center gap-3 animate-fadeIn">
                  <!-- Status Badge -->
                  <span :class="statusClass" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-105">
                    <div class="w-2 h-2 rounded-full mr-2" :class="statusDotClass"></div>
                    {{ careerInfo.condicion_academica }}
                  </span>
                  
                  <!-- Student ID -->
                  <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-700">
                    <svg class="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0v1m4-1v1" />
                    </svg>
                    <span class="text-sm font-mono text-slate-700 dark:text-slate-300 font-medium">
                      {{ careerInfo.legajo }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue';
import { AcademicCapIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
import BaseCard from './BaseCard.vue';
import eventBus, { EventTypes } from 'host/eventBus';

const props = defineProps({
  careerInfo: {
    type: Object,
    required: true
  }
});

function changeCareer() {
  eventBus.emit(EventTypes.DATA_UPDATED, {
    type: 'change-career-requested',
    timestamp: new Date().toISOString()
  });
}

const statusClass = computed(() => {
  const status = props.careerInfo.condicion_academica?.toUpperCase();
  if (status === 'ACTIVO') return 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800';
  if (status === 'INACTIVO') return 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700';
  if (status === 'GRADUADO') return 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
  if (status === 'REGULAR') return 'bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800';
  if (status === 'CONDICIONAL') return 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
  return 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700';
});

const statusDotClass = computed(() => {
  const status = props.careerInfo.condicion_academica?.toUpperCase();
  if (status === 'ACTIVO') return 'bg-emerald-500';
  if (status === 'INACTIVO') return 'bg-slate-400';
  if (status === 'GRADUADO') return 'bg-blue-500';
  if (status === 'REGULAR') return 'bg-teal-500';
  if (status === 'CONDICIONAL') return 'bg-amber-500';
  return 'bg-slate-400';
});
</script>

<style scoped>
/* Animaciones para SelectedCareerInfo */
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

/* Transiciones suaves */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efectos de hover */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>