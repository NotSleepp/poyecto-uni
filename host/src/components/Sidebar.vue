<template>
  <div
    class="fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out"
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      isCollapsed ? 'w-20' : 'w-72'
    ]"
  >
    <!-- Sidebar principal con efecto de cristal mejorado -->
    <div class="flex h-full flex-col bg-[#f4f6f9]/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] rounded-r-2xl overflow-hidden border-r border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 dark:bg-[#1a2234]/95 sidebar-content">
      <!-- Header con logo -->
      <div class="flex h-20 items-center justify-center px-6 bg-gradient-to-r from-[#f4f6f9]/90 via-white/95 to-[#f4f6f9]/90 dark:from-[#1a2234]/95 dark:via-[#1a2234]/90 dark:to-[#1a2234]/95 backdrop-blur-xl border-b border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
        <div class="flex items-center justify-between w-full">
          <div class="relative">
            <router-link to="/" class="block select-none focus:outline-none" draggable="false">
              <img 
                :src="isDarkMode ? 'https://res.cloudinary.com/dkx9plksi/image/upload/v1749513244/logocompleto_xif6lm.png' : 'https://res.cloudinary.com/dkx9plksi/image/upload/v1749513244/logocompleto-dark_jgwiad.png'" 
                alt="Logo Universidad Atlántida"
                class="h-auto w-32 xs:w-36 sm:w-40 object-contain cursor-pointer select-none"
                draggable="false"
                v-if="!isCollapsed"
              />
              <img v-else :src="logoSrc" alt="Logo" class="h-8 w-auto" />
            </router-link>
          </div>
          <!-- Botón para colapsar en desktop -->
          <button
            @click="toggleCollapse"
            class="hidden lg:flex p-2.5 rounded-xl text-[#3d4e6c] hover:text-[#5a6d8f] hover:bg-[#3d4e6c]/10 dark:text-[#7389ae] dark:hover:text-white dark:hover:bg-[#3d4e6c]/20 transition-all duration-200 backdrop-blur-sm"
          >
            <svg
              class="w-5 h-5 transform transition-transform duration-200"
              :class="{ 'rotate-180': isCollapsed }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- User info mejorado -->
      <div class="px-6 py-5 bg-gradient-to-b from-[#f4f6f9]/50 via-white/30 to-transparent dark:from-[#3d4e6c]/10 dark:to-transparent border-b border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
        <div class="flex items-center gap-x-4">
          <div class="relative group">
            <div class="absolute -inset-0.5 bg-gradient-to-br from-[#4c6185] to-[#5d7499] rounded-full blur opacity-60 group-hover:opacity-70 transition duration-300"></div>
            <div class="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#4c6185] to-[#5d7499] flex items-center justify-center ring-[3px] ring-white dark:ring-[#1a2234] group-hover:scale-105 transition-transform duration-300">
              <span class="text-white text-lg font-medium tracking-wide">{{ userInitials }}</span>
            </div>
          </div>
          <div v-if="!isCollapsed" class="transition-all duration-200 space-y-0.5">
            <p class="text-base font-medium text-[#2c3b53] dark:text-white tracking-wide">{{ userFullName }}</p>
            <p class="text-sm text-[#3d4e6c] dark:text-[#f4f6f9] tracking-wide">{{ authStore.user?.usuario || '' }}</p>
          </div>
        </div>
      </div>

      <!-- Menú de navegación mejorado -->
      <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
        <!-- Indicador de carga mejorado -->
        <div v-if="isLoading" class="flex justify-center items-center py-4">
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-[#4c6185]/20 to-[#5d7499]/20 rounded-full blur-sm animate-pulse"></div>
            <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#4c6185] border-t-transparent relative"></div>
          </div>
        </div>

        <!-- Menú con efectos mejorados -->
        <template v-else v-for="(item, index) in menuItems" :key="index">
          <!-- Elemento simple -->
          <router-link 
            v-if="!item.submenu"
            :to="item.path"
            class="group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden"
            :class="[
              isCurrentRoute(item.path)
                ? 'bg-gradient-to-r from-[#f4f6f9]/90 to-[#f4f6f9]/80 dark:from-[#3d4e6c]/20 dark:to-[#3d4e6c]/10 text-[#2c3b53] dark:text-white shadow-sm'
                : 'text-[#3d4e6c] hover:text-[#2c3b53] dark:text-[#f4f6f9] dark:hover:text-white'
            ]"
            :title="isCollapsed ? item.name : ''"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-[#4c6185]/0 via-[#4c6185]/0 to-[#4c6185]/0 group-hover:from-[#4c6185]/5 group-hover:via-[#4c6185]/10 group-hover:to-[#4c6185]/5 transition-all duration-500"></div>
            <component
              :is="item.icon || HomeIcon"
              class="flex-shrink-0 h-[18px] w-[18px] transition-all duration-200"
              :class="[
                isCurrentRoute(item.path)
                  ? 'text-[#2c3b53] dark:text-white transform scale-110'
                  : 'text-[#3d4e6c] dark:text-[#f4f6f9] group-hover:text-[#2c3b53] dark:group-hover:text-white group-hover:scale-110'
              ]"
            />
            <span v-if="!isCollapsed" class="ml-3 tracking-wide">{{ item.name }}</span>
          </router-link>

          <!-- Elemento con submenú mejorado -->
          <div v-else>
            <button
              @click="toggleSubmenu(index)"
              class="group flex w-full items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden"
              :class="[
                openSubmenus[index]
                  ? 'bg-gradient-to-r from-[#f4f6f9]/90 to-[#f4f6f9]/80 dark:from-[#3d4e6c]/20 dark:to-[#3d4e6c]/10 text-[#2c3b53] dark:text-white shadow-sm'
                  : 'text-[#3d4e6c] hover:text-[#2c3b53] dark:text-[#f4f6f9] dark:hover:text-white'
              ]"
              :title="isCollapsed ? item.name : ''"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-[#4c6185]/0 via-[#4c6185]/0 to-[#4c6185]/0 group-hover:from-[#4c6185]/5 group-hover:via-[#4c6185]/10 group-hover:to-[#4c6185]/5 transition-all duration-500"></div>
              <component
                :is="item.icon || HomeIcon"
                class="flex-shrink-0 h-[18px] w-[18px] transition-all duration-200"
                :class="[
                  openSubmenus[index]
                    ? 'text-[#2c3b53] dark:text-white transform scale-110'
                    : 'text-[#3d4e6c] dark:text-[#f4f6f9] group-hover:text-[#2c3b53] dark:group-hover:text-white group-hover:scale-110'
                ]"
              />
              <span v-if="!isCollapsed" class="ml-3 tracking-wide">{{ item.name }}</span>
              <svg
                v-if="!isCollapsed"
                class="h-4 w-4 transform transition-transform duration-200 ml-auto opacity-60"
                :class="{ 'rotate-90': openSubmenus[index] }"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              v-show="openSubmenus[index] && !isCollapsed"
              class="space-y-1 mt-1 transition-all duration-200"
              :class="[isCollapsed ? 'px-2' : 'ml-7']"
            >
              <router-link
                v-for="subitem in item.submenu"
                :key="subitem.path"
                :to="subitem.path"
                class="group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden"
                :class="[
                  isCurrentRoute(subitem.path)
                    ? 'bg-gradient-to-r from-[#f4f6f9]/90 to-[#f4f6f9]/80 dark:from-[#3d4e6c]/20 dark:to-[#3d4e6c]/10 text-[#2c3b53] dark:text-white shadow-sm'
                    : 'text-[#3d4e6c] hover:text-[#2c3b53] dark:text-[#f4f6f9] dark:hover:text-white'
                ]"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-[#4c6185]/0 via-[#4c6185]/0 to-[#4c6185]/0 group-hover:from-[#4c6185]/5 group-hover:via-[#4c6185]/10 group-hover:to-[#4c6185]/5 transition-all duration-500"></div>
                <div class="w-1.5 h-1.5 rounded-full mr-3 transition-all duration-200"
                  :class="[
                    isCurrentRoute(subitem.path)
                      ? 'bg-[#2c3b53] dark:bg-white scale-125'
                      : 'bg-[#3d4e6c] dark:bg-[#f4f6f9] group-hover:bg-[#2c3b53] dark:group-hover:bg-white group-hover:scale-125'
                  ]"
                ></div>
                <span class="tracking-wide">{{ subitem.name }}</span>
              </router-link>
            </div>
          </div>
        </template>
      </nav>

      <!-- Footer con botón de cerrar sesión mejorado -->
      <div class="border-t border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-4 bg-gradient-to-b from-transparent via-[#f4f6f9]/50 to-[#f4f6f9]/80 dark:via-[#1a2234]/30 dark:to-[#1a2234]/50">
        <button
          @click="handleLogout"
          class="group flex w-full items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden text-red-600 hover:bg-red-50/80 dark:text-red-400 dark:hover:bg-red-400/10"
          :title="isCollapsed ? 'Cerrar Sesión' : ''"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-red-500/10 group-hover:to-red-500/5 transition-all duration-500"></div>
          <svg
            class="flex-shrink-0 h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="1.5" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span v-if="!isCollapsed" class="ml-3 tracking-wide">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Overlay para cerrar en móviles mejorado -->
  <div
    v-if="isOpen"
    @click="toggleSidebar"
    class="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm lg:hidden transition-all duration-300"
  ></div>

  <!-- Botón para abrir en móviles mejorado -->
  <button
    v-if="!isOpen"
    @click="toggleSidebar"
    class="fixed top-6 left-6 z-20 rounded-xl bg-gradient-to-r from-[#4c6185] to-[#5d7499] p-3 text-white hover:from-[#5a6d8f] hover:to-[#7389ae] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4c6185] lg:hidden shadow-lg shadow-[#4c6185]/20 transition-all duration-200 group"
  >
    <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4c6185] to-[#5d7499] rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
    <svg
      class="relative h-5 w-5 transform transition-transform duration-200 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <!-- Botón flotante para expandir/colapsar en desktop mejorado -->
  <button
    @click="toggleCollapse"
    class="fixed bottom-6 left-6 z-20 hidden lg:flex p-3 rounded-xl bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 text-[#5a6d8f] hover:text-[#3d4e6c] dark:text-[#5a6d8f] dark:hover:text-[#7389ae] hover:bg-white dark:hover:bg-[#1a2234] transition-all duration-200 border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 group"
  >
    <svg
      class="w-5 h-5 transform transition-all duration-200 group-hover:scale-110"
      :class="{ 'rotate-180': !isCollapsed }"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'
import { API_URL } from '../main.js'
import {
  HomeIcon,
  CogIcon,
  NewspaperIcon,
  ChartBarIcon,
  CubeIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits(['collapse'])
const router = useRouter()
const route = useRoute()
const isOpen = ref(true)
const isCollapsed = ref(false)
const openSubmenus = ref({})
const authStore = useAuthStore()
const themeStore = useThemeStore()
const menuItems = ref([])
const isLoading = ref(true)

const isDarkMode = computed(() => {
  return themeStore.isDark
})

const logoSrc = computed(() => {
  return isDarkMode.value 
    ? 'https://res.cloudinary.com/dkx9plksi/image/upload/v1749513244/logocompleto_xif6lm.png' 
    : 'https://res.cloudinary.com/dkx9plksi/image/upload/v1749513244/logocompleto-dark_jgwiad.png'
})

const userFullName = computed(() => {
  if (!authStore.user?.nombreapellido) return 'Usuario';
  return authStore.user.nombreapellido;
})

const userInitials = computed(() => {
  if (!authStore.user?.nombreapellido) return 'U';
  const names = authStore.user.nombreapellido.split(' ');
  return (names[0].charAt(0) + (names[names.length - 1].charAt(0))).toUpperCase();
})

// Agregar watch para actualizar los datos cuando cambie el usuario
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    console.log('Usuario actualizado:', newUser);
  }
}, { immediate: true });

const obtenerMenu = async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No hay token disponible')
      return
    }

    const response = await fetch(`${API_URL}/user/menu`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener el menú')
    }

    const data = await response.json()
    console.log('Menú obtenido:', data)

    // Agrupar items por sistema
    const sistemasPorId = {}
    data.forEach(item => {
      if (!sistemasPorId[item.fk_sistema]) {
        sistemasPorId[item.fk_sistema] = {
          name: item.nombre_sistema,
          icon: getIconComponent(item.icono),
          submenu: []
        }
      }

      const menuItem = {
        name: item.nombre,
        path: item.directorio.startsWith('http') ? item.directorio : `/${item.carpeta}/${item.directorio}`,
        icon: getIconComponent(item.icono)
      }

      // Si es un ítem con padre, lo agregamos al submenú correspondiente
      if (item.fk_pantalla_padre) {
        const padre = data.find(p => p.pk_pantalla === item.fk_pantalla_padre)
        if (padre) {
          const padreEnMenu = sistemasPorId[item.fk_sistema].submenu.find(
            m => m.name === padre.nombre
          )
          if (padreEnMenu) {
            if (!padreEnMenu.submenu) padreEnMenu.submenu = []
            padreEnMenu.submenu.push(menuItem)
          }
        }
      } else {
        // Si no tiene padre, lo agregamos directamente al sistema
        sistemasPorId[item.fk_sistema].submenu.push(menuItem)
      }
    })

    // Convertir el objeto de sistemas a un array
    menuItems.value = Object.values(sistemasPorId)
    console.log('Menú procesado:', menuItems.value)
  } catch (error) {
    console.error('Error al obtener el menú:', error)
  } finally {
    isLoading.value = false
  }
}

// Función auxiliar para obtener el componente de ícono correspondiente
const getIconComponent = (iconName) => {
  const iconMap = {
    'home': HomeIcon,
    'person': UserGroupIcon,
    'library_books': NewspaperIcon,
    'settings': CogIcon,
    'chart': ChartBarIcon,
    'cube': CubeIcon,
    // Agrega más mapeos según necesites
  }
  return iconMap[iconName] || HomeIcon
}

onMounted(() => {
  const savedState = localStorage.getItem('sidebarCollapsed')
  if (savedState !== null) {
    isCollapsed.value = savedState === 'true'
  }
  obtenerMenu()
  // Intentar obtener los datos del usuario si no están disponibles
  if (!authStore.user && authStore.isAuthenticated) {
    authStore.fetchUserProfile()
  }
})

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('collapse', isCollapsed.value)
  // Guardar preferencia en localStorage
  localStorage.setItem('sidebarCollapsed', isCollapsed.value)
}

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const toggleSubmenu = (index) => {
  if (!isCollapsed.value) {
    openSubmenus.value = {
      ...openSubmenus.value,
      [index]: !openSubmenus.value[index]
    }
  }
}

const isCurrentRoute = (path) => {
  return route.path === path
}

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>
.router-link-active {
  @apply bg-gradient-to-r from-blue-50/90 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-800/10 text-blue-600 dark:text-blue-300 shadow-sm;
}

/* Personalización de la barra de desplazamiento */
nav::-webkit-scrollbar {
  width: 3px;
}

nav::-webkit-scrollbar-track {
  @apply bg-transparent;
}

nav::-webkit-scrollbar-thumb {
  @apply bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-sm;
  border-radius: 1.5px;
}

nav::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-300/60 dark:bg-gray-600/60;
}

/* Eliminar efectos de selección del logo */
.router-link-active:has(img) {
  background: none !important;
}

a:focus {
  outline: none !important;
}

a:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

/* Animaciones suaves */
.router-link-active,
button,
.group {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto hover suave */
.group:hover {
  transform: translateY(-1px);
}

/* Transiciones para el cambio de tema */
:root {
  --theme-transition-duration: 400ms;
  --theme-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Aplicar transiciones a todos los elementos que cambian con el tema */
*,
::before,
::after {
  transition: background-color var(--theme-transition-duration) var(--theme-transition-timing),
              border-color var(--theme-transition-duration) var(--theme-transition-timing),
              color var(--theme-transition-duration) var(--theme-transition-timing),
              fill var(--theme-transition-duration) var(--theme-transition-timing),
              stroke var(--theme-transition-duration) var(--theme-transition-timing),
              opacity var(--theme-transition-duration) var(--theme-transition-timing),
              box-shadow var(--theme-transition-duration) var(--theme-transition-timing),
              transform var(--theme-transition-duration) var(--theme-transition-timing);
}

/* Asegurar que las transiciones de fondo con gradientes sean suaves */
[class*="bg-gradient"] {
  transition: all var(--theme-transition-duration) var(--theme-transition-timing);
}

/* Optimizar rendimiento de las transiciones */
.sidebar-content {
  will-change: background-color, border-color, color;
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
}
</style>