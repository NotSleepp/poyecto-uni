<template>
  <div class="space-y-4">
    <p class="text-sm text-[#57697f] dark:text-[#a4b4d1]">Seleccione la carrera con la que desea operar:</p>

    <div class="grid gap-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
      <label
        v-for="c in carreras"
        :key="c.pkinscripcion_carrera"
        class="flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer"
        :class="selected === c.pkinscripcion_carrera ? 'bg-[#3b82f6]/10 border-[#3b82f6]' : 'border-[#3d4e6c]/10 hover:bg-[#3d4e6c]/5 dark:hover:bg-[#3d4e6c]/20'"
      >
        <input
          type="radio"
          class="form-radio text-[#3b82f6]"
          :value="c.pkinscripcion_carrera"
          v-model="selected"
        />
        <div class="flex flex-col">
          <span class="text-sm font-medium text-[#2c3b53] dark:text-white">{{ c.carrera || c.nombre }}</span>
          <span class="text-xs text-[#57697f] dark:text-[#a4b4d1]">ID: {{ c.pkinscripcion_carrera }}</span>
        </div>
      </label>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <button
        type="button"
        class="inline-flex justify-center rounded-xl bg-[#475b7f]/10 px-4 py-1.5 text-sm font-medium text-[#2c3b53] dark:text-white hover:bg-[#475b7f]/20 focus:outline-none focus:ring-2 focus:ring-[#475b7f]/30 transition-all duration-200"
        @click="$emit('close')"
      >
        Cancelar
      </button>
      <button
        type="button"
        :disabled="!selected"
        class="inline-flex justify-center rounded-xl bg-[#3b82f6] px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/70 transition-all duration-200"
        @click="confirmSelection"
      >
        Seleccionar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import eventBus, { EventTypes } from 'host/eventBus';

const props = defineProps({
  carreras: {
    type: Array,
    required: true,
  },
});

const selected = ref(null);

const emit = defineEmits(['close']);

function confirmSelection() {
  if (!selected.value) return;
  eventBus.emit(EventTypes.DATA_UPDATED, {
    type: 'career-selected',
    pkinscripcion_carrera: selected.value,
  });
  // El propio ModalListener cerrará el modal al recibir el evento "close"
  // que emitimos a continuación.
  emit('close');
}
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
</style> 