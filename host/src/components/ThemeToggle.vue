<template>
  <button
    @click="toggleTheme"
    class="fixed top-6 right-6 p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 z-50 group"
    :title="themeStore.isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <div class="relative">
      <!-- Sol (Modo claro) -->
      <svg
        class="w-6 h-6 text-yellow-500 transition-all duration-500 absolute inset-0"
        :class="themeStore.isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 100"
            to="100 100"
            dur="0.6s"
            begin="0s"
            fill="freeze"
          />
        </path>
      </svg>
      <!-- Luna (Modo oscuro) -->
      <svg
        class="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-all duration-500"
        :class="!themeStore.isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 100"
            to="100 100"
            dur="0.6s"
            begin="0s"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
    <!-- Efecto de ripple -->
    <div class="absolute inset-0 rounded-xl transition-transform duration-500 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100"></div>
    <!-- Efecto de glow -->
    <div class="absolute -inset-1 rounded-xl bg-gradient-to-br from-yellow-400/30 to-orange-500/30 dark:from-indigo-500/30 dark:to-purple-500/30 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
  </button>
</template>

<script setup>
import { useThemeStore } from '../stores/themeStore';

const themeStore = useThemeStore();

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<style scoped>
@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style> 