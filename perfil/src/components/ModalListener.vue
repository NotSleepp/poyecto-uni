<template>
  <Teleport to="body">
    <!-- Overlay con efecto de desenfoque -->
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showModal && shouldShowInCurrentContext" 
        class="fixed inset-0 bg-[#2d3b52]/75 dark:bg-[#1a2436]/80 backdrop-blur-sm transition-opacity z-50"
        @click="hideModal"
      ></div>
    </Transition>

    <!-- Modal -->
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div v-if="showModal && shouldShowInCurrentContext" class="fixed inset-0 z-50 overflow-y-auto" @click.self="hideModal">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div 
            class="relative transform overflow-hidden rounded-3xl bg-[#f5f7fa] dark:bg-[#1a2436] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl max-h-[90vh] flex flex-col"
          >
            <!-- Botón de cierre absoluto -->
            <button
              @click="hideModal"
              class="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors w-8 h-8 flex items-center justify-center"
            >
              <span class="sr-only">Cerrar</span>
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Cabecera -->
            <div class="bg-[#2d3b52]/90 backdrop-blur-sm px-6 py-4 flex-shrink-0 border-b border-[#475b7f]/10">
              <h3 class="text-xl font-semibold leading-6 text-white">
                {{ currentModal.title }}
              </h3>
            </div>

            <!-- Contenido -->
            <div class="px-6 py-5 flex-1 overflow-y-auto custom-scrollbar">
              <component 
                :is="currentModal.component"
                v-bind="currentModal.props"
                @close="hideModal"
              />
            </div>
            
            <!-- Footer con botones de acción -->
            <div 
              v-if="!currentModal.hideActions" 
              class="bg-[#1a2436] border-t border-[#475b7f]/10 px-6 py-4 flex flex-row-reverse gap-3 justify-start flex-shrink-0"
            >
              <button
                v-if="currentModal.confirmText"
                type="button"
                class="inline-flex justify-center rounded-xl bg-gradient-to-r from-[#2d3b52] to-[#475b7f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-[#475b7f] hover:to-[#6c82a6] focus:outline-none focus:ring-2 focus:ring-[#475b7f]/20 transition-all duration-200"
                @click="handleConfirm"
              >
                {{ currentModal.confirmText }}
              </button>
              <button
                type="button"
                class="inline-flex justify-center rounded-xl bg-[#475b7f]/5 px-5 py-2.5 text-sm font-semibold text-[#e9ecf2] shadow-sm ring-1 ring-inset ring-[#475b7f]/10 hover:bg-[#475b7f]/10 focus:outline-none focus:ring-2 focus:ring-[#475b7f]/20 transition-all duration-200"
                @click="hideModal"
              >
                {{ currentModal.cancelText || 'Cerrar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import eventBus, { EventTypes } from '../utils/eventBus';

const showModal = ref(false);
const currentModal = ref({
  title: '',
  component: null,
  props: {},
  confirmText: '',
  cancelText: 'Cerrar',
  hideActions: false,
  onConfirm: null
});

// Determinar si estamos en el contexto correcto para mostrar modales
const shouldShowInCurrentContext = computed(() => {
  // Verificar si estamos en el proyecto remoto ejecutándose de forma independiente
  return window.location.pathname.startsWith('/frontend/home/') || 
         window.location.pathname === '/' ||
         window.location.pathname === '/index.html';
});

const showModalWithConfig = (config) => {
  // Solo mostrar el modal si estamos en el contexto correcto
  if (!shouldShowInCurrentContext.value) {
    console.log('Modal no mostrado: contexto incorrecto');
    return;
  }
  
  currentModal.value = {
    ...currentModal.value,
    ...config
  };
  showModal.value = true;
  // Prevenir scroll en el body mientras el modal está abierto
  document.body.style.overflow = 'hidden';
};

const hideModal = () => {
  showModal.value = false;
  // Restaurar scroll del body
  setTimeout(() => {
    document.body.style.overflow = '';
    currentModal.value = {
      title: '',
      component: null,
      props: {},
      confirmText: '',
      cancelText: 'Cerrar',
      hideActions: false,
      onConfirm: null
    };
  }, 300);
};

const handleConfirm = () => {
  if (currentModal.value.onConfirm) {
    currentModal.value.onConfirm();
  }
  hideModal();
};

// Manejar cierre con tecla Escape
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && showModal.value) {
    hideModal();
  }
};

onMounted(() => {
  eventBus.on(EventTypes.SHOW_MODAL, showModalWithConfig);
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  eventBus.off(EventTypes.SHOW_MODAL, showModalWithConfig);
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* Para modo oscuro */
:root.dark .custom-scrollbar {
  scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
}

:root.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

:root.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.7);
}
</style> 