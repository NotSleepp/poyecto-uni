<template>
  <div
    @click="updateModelValue(value)"
    :class="[
      'cursor-pointer rounded-xl p-4 transition-all duration-200 backdrop-blur-xl border',
      modelValue===value 
        ? 'border-[#3b82f6] bg-[#3b82f6]/5 dark:bg-[#3b82f6]/10 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)]' 
        : 'border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 hover:border-[#3b82f6]/50 dark:hover:border-[#3b82f6]/50 hover:shadow-lg'
    ]"
  >
    <div class="flex flex-col items-center text-center space-y-2">
      <component :is="iconComponent" class="w-10 h-10 text-[#3b82f6] dark:text-[#60a5fa]" />
      <h3 class="font-medium text-[#2c3b53] dark:text-white">{{ label }}</h3>
      <p class="text-xs text-[#57697f] dark:text-[#a4b4d1]">{{ desc }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  value: String,
  icon: String,
  label: String,
  desc: String
});
const emit = defineEmits(['update:modelValue']);

function updateModelValue(val){
  emit('update:modelValue', val);
}

import { UserIcon, BookOpenIcon, StarIcon } from '@heroicons/vue/24/outline';
const iconsMap = { UserIcon, BookOpenIcon, StarIcon };
const iconComponent = iconsMap[props.icon] || UserIcon;
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
              color var(--theme-transition-duration) var(--theme-transition-timing),
              box-shadow var(--theme-transition-duration) var(--theme-transition-timing),
              transform var(--theme-transition-duration) var(--theme-transition-timing);
}
</style> 