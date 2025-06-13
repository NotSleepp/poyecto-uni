<template>
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notificación -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showNotification" class="max-w-sm w-full bg-[#f8fafc] dark:bg-[#1c2533] shadow-lg rounded-lg pointer-events-auto ring-1 ring-[#475b7f]/10">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Iconos según tipo -->
                <svg v-if="currentNotification.type === 'error'" class="h-6 w-6 text-[#a4b4d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else-if="currentNotification.type === 'success'" class="h-6 w-6 text-[#8195b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else class="h-6 w-6 text-[#475b7f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-[#2f3f57] dark:text-[#f8fafc]">{{ currentNotification.title || defaultTitle }}</p>
                <p class="mt-1 text-sm text-[#57697f] dark:text-[#a4b4d1]">{{ currentNotification.message }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button @click="hideNotification" class="bg-[#f8fafc] dark:bg-[#1c2533] rounded-md inline-flex text-[#57697f] hover:text-[#2f3f57] dark:text-[#a4b4d1] dark:hover:text-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#475b7f] dark:focus:ring-offset-[#1c2533]">
                  <span class="sr-only">Cerrar</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                </button>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0">
              <div class="h-1 transition-all duration-300 rounded-b-lg" :class="progressBarClass" :style="{ width: `${progress}%` }"></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import eventBus, { EventTypes } from 'host/eventBus';

const showNotification = ref(false);
const progress = ref(100);
const currentNotification = ref({ type: 'info', title: '', message: '' });

const defaultTitle = computed(() => {
  switch (currentNotification.value.type) {
    case 'error':
      return 'Error';
    case 'success':
      return 'Éxito';
    default:
      return 'Información';
  }
});

const progressBarClass = computed(() => ({
  'bg-[#a4b4d1]': currentNotification.value.type === 'error',
  'bg-[#8195b8]': currentNotification.value.type === 'success',
  'bg-[#475b7f]': currentNotification.value.type === 'info',
}));

let progressInterval;

const showNotificationWithTimeout = (notification) => {
  currentNotification.value = notification;
  showNotification.value = true;
  progress.value = 100;

  if (progressInterval) clearInterval(progressInterval);
  const duration = 5000;
  const updateInterval = 10;
  const step = (100 * updateInterval) / duration;

  progressInterval = setInterval(() => {
    progress.value = Math.max(0, progress.value - step);
    if (progress.value <= 0) hideNotification();
  }, updateInterval);
};

const hideNotification = () => {
  showNotification.value = false;
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
};

const handleError = (error) => showNotificationWithTimeout({ type: 'error', message: error.message });
const handleSuccess = (data) => showNotificationWithTimeout({ type: 'success', message: data.message });
const handleNavigation = (nav) => showNotificationWithTimeout({ type: 'info', title: 'Navegación', message: `Navegando de ${nav.from} a ${nav.to}` });

onMounted(() => {
  eventBus.on(EventTypes.ERROR, handleError);
  eventBus.on(EventTypes.NAVIGATION, handleNavigation);
  eventBus.on(EventTypes.SUCCESS, handleSuccess);
});

onUnmounted(() => {
  eventBus.off(EventTypes.ERROR, handleError);
  eventBus.off(EventTypes.NAVIGATION, handleNavigation);
  eventBus.off(EventTypes.SUCCESS, handleSuccess);
  if (progressInterval) clearInterval(progressInterval);
});
</script> 