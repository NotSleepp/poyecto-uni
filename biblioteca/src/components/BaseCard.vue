<template>
  <div 
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 ease-in-out border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm" 
    :class="[
      wrapperClass,
      {'hover:shadow-xl hover:border-primary-500/50 dark:hover:border-primary-400/50': isHoverable}
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
/**
 * Enhanced card component with modern styling and hover effects.
 * Features:
 * - Smooth transitions
 * - Optional hover effects
 * - Backdrop blur for depth
 * - Rounded corners
 * 
 * @prop {String} wrapperClass - Additional classes for customization
 * @prop {Boolean} isHoverable - Enable hover animations
 */
defineProps({
  wrapperClass: {
    type: String,
    default: ''
  },
  isHoverable: {
    type: Boolean,
    default: false
  }
});
</script> 