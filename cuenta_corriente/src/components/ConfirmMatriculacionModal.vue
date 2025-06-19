<template>
  <div class="space-y-4">
    <!-- Encabezado -->
    <div class="text-center mb-2">
      <AcademicCapIcon class="w-12 h-12 text-[#3b82f6] dark:text-[#60a5fa] mx-auto" />
      <h3 class="text-xl font-semibold mt-2 text-[#2c3b53] dark:text-white">Confirmación de Matriculación</h3>
    </div>

    <!-- Mensajes -->
    <p class="text-sm text-[#57697f] dark:text-[#a4b4d1]">
      Se generará un concepto de pago para la matriculación como cursante <strong class="capitalize text-[#2c3b53] dark:text-white">{{ tipo }}</strong>.
    </p>
    <p class="text-sm text-[#57697f] dark:text-[#a4b4d1]">
      Este proceso no puede cancelarse una vez iniciado.
    </p>

    <!-- Aviso -->
    <div class="flex items-center gap-2 text-sm text-[#b45309] dark:text-[#fcd34d] bg-[#fef3c7]/50 dark:bg-[#92400e]/20 p-3 rounded-xl border border-[#f59e0b]/10 dark:border-[#f59e0b]/20">
      <InformationCircleIcon class="w-4 h-4 flex-shrink-0" />
      <span>Al confirmar, acepta los términos y condiciones de matriculación.</span>
    </div>
  </div>
</template>

<script setup>
import { AcademicCapIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  tipo: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Transiciones suaves para cambios de tema */
:root {
  --theme-transition-duration: 400ms;
  --theme-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

*,
::before,
::after {
  transition: background-color var(--theme-transition-duration) var(--theme-transition-timing),
              border-color var(--theme-transition-duration) var(--theme-transition-timing),
              color var(--theme-transition-duration) var(--theme-transition-timing);
}
</style> 