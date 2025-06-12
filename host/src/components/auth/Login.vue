<template>
  <div v-if="!authStore.isTransitioning" class="min-h-screen flex bg-[#2c3e50] relative overflow-hidden">
    <!-- Carrusel de imágenes de fondo -->
    <div class="absolute inset-0">
      <transition-group name="fade">
        <div 
          v-for="(image, index) in backgroundImages" 
          :key="image"
          v-show="currentImageIndex === index"
          class="absolute inset-0"
        >
          <img 
            :src="image" 
            :alt="`Fondo ${index + 1}`"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#2c3e50]/80 via-[#2c3e50]/70 to-[#2c3e50]/80 backdrop-blur-[1px]"></div>
        </div>
      </transition-group>
    </div>

    <!-- Contenedor principal -->
    <div class="relative w-full min-h-screen flex items-center justify-center p-3">
      <div class="w-full max-w-[90%] xs:max-w-[85%] sm:max-w-sm space-y-4 relative z-10">
        <!-- Logo y título -->
        <div class="text-center space-y-3">
          <div class="mx-auto h-12 xs:h-14 sm:h-16 w-36 xs:w-40 sm:w-44 flex items-center justify-center">
            <img 
              src="@/assets/logocompleto.png" 
              alt="Logo Universidad Atlántida"
              class="h-auto w-full object-contain transform transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
          </div>
          <div class="space-y-1.5">
            <h2 class="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-white">
              Bienvenido de nuevo
            </h2>
            <p class="text-xs sm:text-sm text-[#f4f6f9]">
              Ingresa tus credenciales
            </p>
          </div>
        </div>

        <!-- Formulario -->
        <form class="space-y-4" @submit.prevent="handleLogin">
          <div class="rounded-xl bg-white/[0.08] backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] p-4 space-y-3.5 border border-white/[0.12] relative overflow-hidden">
            <!-- Efecto de brillo sutil -->
            <div class="absolute -inset-[1000px] bg-gradient-to-r from-[#3b82f6]/5 to-[#60a5fa]/5 animate-[pulse_8s_ease-in-out_infinite]"></div>
            
            <!-- Campo de DNI -->
            <div class="space-y-1.5 relative">
              <label for="dni" class="block text-xs font-medium text-[#f4f6f9]">
                DNI
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-3.5 w-3.5 text-[#f4f6f9] group-focus-within:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="dni"
                  v-model="dni"
                  type="text"
                  required
                  v-mask="'########'"
                  maxlength="8"
                  :disabled="isLoading || authStore.isTransitioning"
                  class="block w-full pl-9 pr-3 py-2 text-sm border border-[#3d4e6c]/20 rounded-lg bg-[#2c3b53]/20 text-white placeholder-[#f4f6f9]/50 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-[#5a6d8f]/70 focus:border-[#5a6d8f]/70 transition-all duration-200 disabled:opacity-50"
                  placeholder="00000000"
                />
              </div>
            </div>

            <!-- Campo de contraseña -->
            <div class="space-y-1.5 relative">
              <label for="password" class="block text-xs font-medium text-[#f4f6f9]">
                Contraseña
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-3.5 w-3.5 text-[#f4f6f9] group-focus-within:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :disabled="isLoading || authStore.isTransitioning"
                  class="block w-full pl-9 pr-9 py-2 text-sm border border-[#3d4e6c]/20 rounded-lg bg-[#2c3b53]/20 text-white placeholder-[#f4f6f9]/50 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-[#5a6d8f]/70 focus:border-[#5a6d8f]/70 transition-all duration-200 disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  :disabled="isLoading || authStore.isTransitioning"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    class="h-3.5 w-3.5 text-[#f4f6f9] hover:text-white transition-colors duration-200"
                    :class="showPassword ? 'hidden' : 'block'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg
                    class="h-3.5 w-3.5 text-[#f4f6f9] hover:text-white transition-colors duration-200"
                    :class="showPassword ? 'block' : 'hidden'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Recordarme y Olvidé contraseña -->
            <div class="flex items-center justify-between text-xs relative">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  :disabled="isLoading || authStore.isTransitioning"
                  class="h-3.5 w-3.5 text-[#4c6185] focus:ring-[#5a6d8f]/50 border-[#3d4e6c]/20 rounded cursor-pointer disabled:opacity-50 bg-[#2c3b53]/20"
                />
                <label for="remember-me" class="ml-1.5 block text-[#f4f6f9] cursor-pointer">
                  Recordarme
                </label>
              </div>
              <a 
                href="#" 
                @click.prevent="mode = 'recovery'"
                class="font-medium text-[#f4f6f9] hover:text-white transition-colors duration-200"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <!-- Mensaje de error -->
            <div v-if="error" class="rounded-lg bg-[#ef4444]/20 border border-[#ef4444]/30 backdrop-blur-xl p-2.5 text-xs text-red-300 relative">
              {{ error }}
            </div>

            <!-- Botón de inicio de sesión -->
            <button
              type="submit"
              :disabled="isLoading || authStore.isTransitioning"
              class="w-full relative flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#3b82f6] hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/70 focus:ring-offset-1 focus:ring-offset-[#2c3e50] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)]"
            >
              <span :class="{ 'opacity-0': isLoading || authStore.isTransitioning }" class="relative z-10">
                Iniciar sesión
              </span>
              <div
                v-if="isLoading || authStore.isTransitioning"
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </button>
          </div>
        </form>

        <div class="text-xs text-center mt-4">
          <span class="text-gray-300/90">¿Primera vez?</span>
          <a 
            href="#" 
            @click.prevent="mode = 'request'"
            class="ml-1 text-[#60a5fa] hover:text-white transition-colors duration-200"
          >
            Solicitar cuenta
          </a>
        </div>

        <!-- Divider -->
        <div class="w-full max-w-[280px] sm:max-w-xs mx-auto mt-6 mb-4">
          <div class="border-t border-white/20"></div>
        </div>

        <!-- Enlaces y copyright -->
        <div class="flex flex-col items-center space-y-3 sm:space-y-4">
          <!-- Enlaces -->
          <div class="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 px-2 xs:px-4">
            <a 
              href="https://atlantida.edu.ar/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center text-[#f4f6f9] hover:text-white transition-colors duration-200 group text-xs xs:text-sm sm:text-base"
            >
              <svg class="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-1.5 text-[#f4f6f9] group-hover:text-white transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              <span>Universidad Atlántida</span>
            </a>
            <a 
              href="https://virtual.atlantida.edu.ar/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group text-xs xs:text-sm sm:text-base"
            >
              <svg class="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-1.5 text-gray-400 group-hover:text-white/70 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              <span>Virtual</span>
            </a>
            <a 
              href="https://web.atlantida.edu.ar/manuales/manual_ingreso_autogestion.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group text-xs xs:text-sm sm:text-base"
            >
              <svg class="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-1.5 text-gray-400 group-hover:text-white/70 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span>Instructivo de Ayuda</span>
            </a>
          </div>

          <!-- Información de contacto -->
          <div class="text-[#f4f6f9] text-[10px] xs:text-xs sm:text-sm text-center">
            Consultas | Teléfono: 02257-429300/420338 |
          </div>

          <!-- Copyright -->
          <p class="text-[#f4f6f9] text-[10px] xs:text-xs sm:text-sm">© {{ new Date().getFullYear() }} Universidad Atlántida Argentina</p>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="mode !== 'login'" class="relative z-50">
        <!-- Modal de recuperación de contraseña -->
        <div v-if="mode === 'recovery'" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-[#0B1121] rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl transform transition-all">
            <h3 class="text-2xl font-bold text-white mb-6">Recuperar contraseña</h3>
            <form @submit.prevent="handleRecovery" class="space-y-6">
              <div class="space-y-2">
                <label for="recoveryDni" class="block text-sm font-medium text-[#f4f6f9]">
                  DNI
                </label>
                <input
                  id="recoveryDni"
                  v-model="recoveryDni"
                  type="text"
                  required
                  v-mask="'########'"
                  maxlength="8"
                  class="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-200"
                  placeholder="00000000"
                />
              </div>
              <div class="space-y-2">
                <label for="recoveryEmail" class="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="recoveryEmail"
                  v-model="recoveryEmail"
                  type="email"
                  required
                  class="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-200"
                  placeholder="ejemplo@email.com"
                />
              </div>
              <div class="space-y-3">
                <button
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-[#3b82f6] hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6] transition-all duration-200"
                >
                  Enviar instrucciones
                </button>
                <button
                  type="button"
                  @click="mode = 'login'"
                  class="w-full flex justify-center py-3 px-4 border border-white/10 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Volver
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal de solicitud de cuenta -->
        <div v-if="mode === 'request'" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-[#0B1121] rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl transform transition-all">
            <h3 class="text-2xl font-bold text-white mb-6">Solicitar nueva cuenta</h3>
            <form @submit.prevent="handleRequest" class="space-y-6">
              <div class="space-y-2">
                <label for="requestDni" class="block text-sm font-medium text-gray-300">
                  DNI
                </label>
                <input
                  id="requestDni"
                  v-model="requestDni"
                  type="text"
                  required
                  v-mask="'########'"
                  maxlength="8"
                  class="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-200"
                  placeholder="00000000"
                />
              </div>
              <div class="space-y-3">
                <button
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-[#3b82f6] hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6] transition-all duration-200"
                >
                  Solicitar cuenta
                </button>
                <button
                  type="button"
                  @click="mode = 'login'"
                  class="w-full flex justify-center py-3 px-4 border border-white/10 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Volver
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { vMask } from 'vue-the-mask'

// Importar las imágenes
import fondo1 from '@/assets/img/fondos/1.jpeg'
import fondo2 from '@/assets/img/fondos/2.jpeg'
import fondo3 from '@/assets/img/fondos/3.jpeg'
import fondo4 from '@/assets/img/fondos/4.jpeg'

const authStore = useAuthStore()
const mode = ref('login')
const dni = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const error = ref('')
const isLoading = ref(false)

// Campos para recuperación de contraseña
const recoveryDni = ref('')
const recoveryEmail = ref('')

// Campo para solicitud de cuenta
const requestDni = ref('')

// Carrusel de imágenes
const backgroundImages = [
  fondo1,
  fondo2,
  fondo3,
  fondo4
]
const currentImageIndex = ref(0)
let carouselInterval

// Función para cambiar la imagen
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.length
}

// Iniciar y detener el carrusel automático
onMounted(() => {
  carouselInterval = setInterval(nextImage, 5000)
})

onUnmounted(() => {
  if (carouselInterval) clearInterval(carouselInterval)
})

const handleLogin = async () => {
  try {
    error.value = ''
    isLoading.value = true
    const result = await authStore.login({
      dni: dni.value,
      password: password.value
    })
    
    if (!result.success) {
      error.value = result.error || 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
    }
  } catch (err) {
    error.value = 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.'
    console.error('Error de login:', err)
  } finally {
    isLoading.value = false
  }
}

const handleRecovery = async () => {
  try {
    isLoading.value = true
    const result = await authStore.recoverPassword({
      dni: recoveryDni.value,
      email: recoveryEmail.value
    })
    
    if (result.success) {
      mode.value = 'login'
      // Aquí podrías mostrar un mensaje de éxito
    } else {
      error.value = result.error || 'Error al procesar la solicitud'
    }
  } catch (err) {
    error.value = 'Ocurrió un error al procesar la solicitud'
    console.error('Error de recuperación:', err)
  } finally {
    isLoading.value = false
  }
}

const handleRequest = async () => {
  try {
    isLoading.value = true
    const result = await authStore.requestAccount(requestDni.value)
    
    if (result.success) {
      mode.value = 'login'
      // Aquí podrías mostrar un mensaje de éxito
    } else {
      error.value = result.error || 'Error al procesar la solicitud'
    }
  } catch (err) {
    error.value = 'Ocurrió un error al procesar la solicitud'
    console.error('Error de solicitud:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes shine {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
}

.shine {
  background: linear-gradient(
    120deg,
    transparent 0%,
    transparent 25%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 75%,
    transparent 100%
  );
  background-size: 200% auto;
  animation: shine 8s linear infinite;
}
</style> 