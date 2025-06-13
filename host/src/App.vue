<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f4f6f9] to-[#e8ecf3] dark:from-[#1a2234] dark:to-[#2c3b53]">
    <template v-if="authStore.isReady">
      <transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <!-- Layout autenticado -->
        <div v-if="authStore.isAuthenticated && !authStore.isTransitioning" class="relative min-h-screen" key="auth">
          <Sidebar @collapse="handleSidebarCollapse" />
          <div
            class="min-h-screen transition-all duration-300 ease-in-out pt-16"
            :class="[
              !isSidebarCollapsed ? 'lg:ml-72' : 'lg:ml-20',
              'relative z-0'
            ]"
          >
            <!-- Header -->
            <header class="sticky top-0 z-40 backdrop-blur-lg bg-[#f4f6f9]/80 dark:bg-[#1a2234]/80 border-b border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 fixed w-full left-0">
              <div class="h-16 px-6 flex items-center justify-between transition-all duration-300 ease-in-out"
                :class="[!isSidebarCollapsed ? 'lg:ml-72' : 'lg:ml-20']">
                <h1 class="text-xl font-semibold text-[#2c3b53] dark:text-white">
                  {{ route.meta.title || 'Dashboard' }}
                </h1>
                <div class="flex items-center space-x-4">
                  <ThemeToggle class="relative" />
                  <!-- Aquí puedes agregar más elementos del header -->
                </div>
              </div>
            </header>

            <!-- Contenido principal -->
            <main class="p-6">
              <router-view v-slot="{ Component }">
                <transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0 translate-y-4"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                  mode="out-in"
                >
                  <component :is="Component" :theme="themeStore.currentTheme" />
                </transition>
              </router-view>
            </main>

            <!-- Footer -->
            <footer class="border-t border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
              <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p class="text-center text-sm text-[#2c3b53] dark:text-[#f4f6f9]">
                  © {{ new Date().getFullYear() }} Universidad Atlantida. Todos los derechos reservados.
                </p>
              </div>
            </footer>
          </div>
          <NotificationListener />
          <ModalListener />
        </div>

        <!-- Layout no autenticado -->
        <div v-else-if="!authStore.isAuthenticated && !authStore.isTransitioning" class="min-h-screen" key="non-auth">
          <router-view v-slot="{ Component }">
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 transform scale-95"
              enter-to-class="opacity-100 transform scale-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 transform scale-100"
              leave-to-class="opacity-0 transform scale-95"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

        <!-- Estado de transición (solo para logout) -->
        <div v-else-if="authStore.isTransitioning" class="min-h-screen flex items-center justify-center">
          <div class="text-center">
            <div class="relative">
              <div class="absolute -inset-2 bg-gradient-to-r from-[#4c6185] to-[#5d7499] rounded-lg opacity-20 blur-lg animate-pulse"></div>
              <svg class="w-16 h-16 text-[#2c3b53] dark:text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p class="mt-4 text-sm text-[#2c3b53] dark:text-[#f4f6f9]">Cerrando sesión...</p>
          </div>
        </div>
      </transition>
    </template>

    <!-- Pantalla de carga inicial -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="relative">
          <div class="absolute -inset-2 bg-gradient-to-r from-[#4c6185] to-[#5d7499] rounded-lg opacity-20 blur-lg animate-pulse"></div>
          <svg class="w-16 h-16 text-[#2c3b53] dark:text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="mt-4 text-sm text-[#2c3b53] dark:text-[#f4f6f9]">Cargando...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import NotificationListener from './components/NotificationListener.vue'
import ModalListener from './components/ModalListener.vue'
import { useThemeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'

const route = useRoute()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const isSidebarCollapsed = ref(false)

const handleSidebarCollapse = (collapsed) => {
  isSidebarCollapsed.value = collapsed
}

onMounted(() => {
  themeStore.initTheme()
  authStore.initAuth()
})
</script>

<style>
/* Transiciones suaves para cambios de tema */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-[#5a6d8f]/50 hover:bg-[#5a6d8f]/70 dark:bg-[#3d4e6c]/50 dark:hover:bg-[#3d4e6c]/70;
  border-radius: 4px;
}

/* Mejoras de legibilidad */
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prevenir el parpadeo del contenido durante la carga del tema */
.dark body {
  @apply bg-[#1a2234];
}

/* Asegurar que las transiciones no se solapen */
.v-enter-active,
.v-leave-active {
  position: absolute;
  width: 100%;
}

.router-view-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
