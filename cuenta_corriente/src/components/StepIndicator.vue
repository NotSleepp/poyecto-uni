<template>
  <div class="flex items-center gap-3">
    <div 
      :class="[
        'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200', 
        active 
          ? 'bg-[#3b82f6] text-white shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)]' 
          : 'bg-[#3d4e6c]/10 dark:bg-[#3d4e6c]/20 text-[#57697f] dark:text-[#a4b4d1]'
      ]"
    >
      {{ step }}
    </div>
    <div>
      <h3 
        class="font-medium transition-colors duration-200" 
        :class="active ? 'text-[#2c3b53] dark:text-white' : 'text-[#57697f] dark:text-[#a4b4d1]'"
      >
        {{ label }}
      </h3>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  step: Number,
  label: String,
  active: Boolean
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
              color var(--theme-transition-duration) var(--theme-transition-timing),
              box-shadow var(--theme-transition-duration) var(--theme-transition-timing);
}
</style> 