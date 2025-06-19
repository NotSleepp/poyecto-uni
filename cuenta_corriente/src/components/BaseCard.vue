<template>
  <div 
    :class="[
      'bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 transition-all duration-200',
      wrapperClass
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  wrapperClass: {
    type: String,
    default: ''
  }
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
              box-shadow var(--theme-transition-duration) var(--theme-transition-timing);
}
</style> 