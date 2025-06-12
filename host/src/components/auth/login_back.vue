<template>
  <div class="min-h-screen flex">
    <!-- Sección izquierda - Carrusel -->
    <div class="w-7/12 2xl:w-4/6 relative overflow-hidden">
      <div id="fondo" class="absolute inset-0">
        <!-- El fondo se establecerá mediante JavaScript -->
      </div>
    </div>

    <!-- Sección derecha - Formulario -->
    <div class="w-5/12 2xl:w-2/6 bg-[#415579] flex flex-col min-h-screen">
      <!-- Logo -->
      <div class="flex justify-center pt-8 mb-8">
        <img 
          src="@/assets/logocompleto.png" 
          alt="Logo"
          class="w-64"
        />
      </div>

      <!-- Contenedor del formulario -->
      <div class="flex-grow flex flex-col justify-center px-8">
        <div class="w-full max-w-md mx-auto">
          <!-- Mensaje de error global -->
          <div v-if="error" class="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            <div class="flex items-center">
              <ExclamationCircleIcon class="h-5 w-5 text-red-400 mr-2" />
              {{ error }}
            </div>
          </div>

          <!-- Formulario de Login -->
          <transition
            name="custom-classes"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            @before-leave="onBeforeLeave"
            @after-leave="onAfterLeave"
          >
            <div v-if="mode === 'login'" key="login" class="space-y-6">
              <div>
                <label for="dni" class="block mb-2 text-sm font-medium text-white">DNI</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IdentificationIcon class="h-5 w-5 " />
                  </div>
                  <input
                    v-model="dni"
                    type="text"
                    id="dni"
                    v-mask="'########'"
                    class="bg-white pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="00000000"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-white">Contraseña</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon class="h-5 w-5 " />
                  </div>
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    class="bg-white pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="•••••••••"
                    required
                    @keyup.enter="handleMainButton"
                  />
                  <button 
                    type="button" 
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    @click="showPassword = !showPassword"
                  >
                    <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                    <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <a
                  href="#"
                  @click.prevent="toggleForm('recovery')"
                  class="text-sm text-white hover:text-blue-300 float-right mt-2"
                >¿Olvidaste tu contraseña?</a>
              </div>
            </div>
          </transition>

          <!-- Formulario de Solicitud -->
          <transition
            name="custom-classes"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            @before-leave="onBeforeLeave"
            @after-leave="onAfterLeave"
          >
            <div v-if="mode === 'request'" key="request" class="space-y-6">
              <h2 class="text-xl font-bold text-white text-center mb-6">Solicitar Nueva Cuenta</h2>
              <div>
                <label for="dniRequest" class="block mb-2 text-sm font-medium text-white">DNI</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IdentificationIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="dniRequest"
                    type="text"
                    id="dniRequest"
                    v-mask="'########'"
                    class="bg-white pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="00000000"
                    required
                    @keyup.enter="handleMainButton"
                  />
                </div>
              </div>
            </div>
          </transition>

          <!-- Formulario de Recuperación -->
          <transition
            name="custom-classes"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            @before-leave="onBeforeLeave"
            @after-leave="onAfterLeave"
          >
            <div v-if="mode === 'recovery'" key="recovery" class="space-y-6">
              <h2 class="text-xl font-bold text-white text-center mb-6">Recuperar Contraseña</h2>
              <div>
                <label for="dniRecovery" class="block mb-2 text-sm font-medium text-white">DNI</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IdentificationIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="dniRecovery"
                    type="text"
                    id="dniRecovery"
                    v-mask="'########'"
                    class="bg-white pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="00000000"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="emailRecovery" class="block mb-2 text-sm font-medium text-white">Email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="emailRecovery"
                    type="email"
                    id="emailRecovery"
                    class="bg-white pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="ejemplo@mail.com"
                    required
                    @keyup.enter="handleMainButton"
                  />
                </div>
              </div>
            </div>
          </transition>

          <!-- Botones -->
          <div class="space-y-4 mt-6">
            <button
              type="button"
              @click="handleMainButton"
              id="mainButton"
              class="flex justify-center items-center w-full text-white bg-[#75b2d9] hover:bg-[#89c1e5] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
            >
              <span v-if="isLoading" class="mr-2">
                <ArrowPathIcon class="h-5 w-5 animate-spin" />
              </span>
              {{ mainButtonText }}
            </button>
            <button
              type="button"
              @click="toggleForm(mode === 'login' ? 'request' : 'login')"
              id="toggleButton"
              class="w-full text-white hover:text-black border border-white hover:bg-white/50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
            >
              {{ toggleButtonText }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-8 py-4 mt-auto">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-white text-sm">
          <a href="https://atlantida.edu.ar/" target="_blank" rel="noopener noreferrer" class="flex items-center hover:text-blue-300 transition-colors">
            <LinkIcon class="h-5 w-5 mr-2" />
            Universidad Atlántida
          </a>
          <a href="https://virtual.atlantida.edu.ar/" target="_blank" rel="noopener noreferrer" class="flex items-center hover:text-blue-300 transition-colors">
            <GlobeAltIcon class="h-5 w-5 mr-2" />
            Virtual
          </a>
          <a href="https://web.atlantida.edu.ar/manuales/manual_ingreso_autogestion.pdf" target="_blank" rel="noopener noreferrer" class="flex items-center hover:text-blue-300 transition-colors">
            <DocumentTextIcon class="h-5 w-5 mr-2" />
            Instructivo de Ayuda
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch, onUnmounted, getCurrentInstance } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { vMask } from 'vue-the-mask'
import router from '@/router'
import {
  IdentificationIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  LinkIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const app = getCurrentInstance()
const $api = app.appContext.config.globalProperties.$api

const mode = ref('login')
const dni = ref('')
const password = ref('')
const dniRequest = ref('')
const dniRecovery = ref('')
const emailRecovery = ref('')
const isTransitioning = ref(false)
const error = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
let nextMode = null

const mainButtonText = computed(() => {
  switch (mode.value) {
    case 'login':
      return 'Acceder'
    case 'request':
      return 'Solicitar'
    case 'recovery':
      return 'Enviar mail'
    default:
      return ''
  }
})

const toggleButtonText = computed(() => {
  return mode.value === 'login' ? 'Ingreso por primera vez' : 'Volver atrás'
})

function toggleForm(newMode) {
  if (!isTransitioning.value) {
    isTransitioning.value = true
    error.value = ''
    nextMode = newMode
    mode.value = nextMode
    nextMode = null
    isTransitioning.value = false
  }
}

function onBeforeLeave(el) {
  el.style.display = 'none'
}

function onAfterLeave(el) {
  el.style.display = ''
}

function handleMainButton() {
  error.value = ''
  isLoading.value = true
  
  switch (mode.value) {
    case 'login':
      if (!dni.value || !password.value) {
        error.value = 'Por favor, complete todos los campos'
        isLoading.value = false
        return
      }
      generalPost(`${$api}usuarios/login.php`, {
        consulta: 'login',
        user: dni.value,
        password: password.value
      })
      break
    case 'request':
      if (!dniRequest.value) {
        error.value = 'Por favor, ingrese su DNI'
        isLoading.value = false
        return
      }
      // Lógica de solicitud
      break
    case 'recovery':
      if (!dniRecovery.value || !emailRecovery.value) {
        error.value = 'Por favor, complete todos los campos'
        isLoading.value = false
        return
      }
      // Lógica de recuperación
      break
  }
}

function generalPost(url, data) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      if (data.estado) {
        localStorage.setItem('token', data.token)
        router.push('/dashboard')
      } else {
        error.value = data.mensaje || 'Error al procesar la solicitud'
      }
    })
    .catch(err => {
      error.value = 'Error de conexión. Por favor, intente nuevamente'
      console.error('Error:', err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

// Carrusel de imágenes
onMounted(() => {
  try {
    const fondos = [
      '/src/assets/img/fondos/1.jpeg',
      '/src/assets/img/fondos/2.jpeg',
      '/src/assets/img/fondos/3.jpeg',
      '/src/assets/img/fondos/4.jpeg'
    ]

    const fondoElement = document.getElementById('fondo')
    let currentIndex = 0

    const updateBackground = () => {
      if (fondoElement) {
        fondoElement.style.backgroundImage = `url(${fondos[currentIndex]})`
        fondoElement.style.backgroundSize = 'cover'
        fondoElement.style.backgroundPosition = 'center'
        fondoElement.style.backgroundRepeat = 'no-repeat'
        currentIndex = (currentIndex + 1) % fondos.length
      }
    }

    updateBackground()
    const interval = setInterval(updateBackground, 5000)

    onUnmounted(() => {
      clearInterval(interval)
    })
  } catch (error) {
    console.error('Error al cargar las imágenes:', error)
  }
})
</script>

<style scoped>
#fondo {
  transition: background-image 0.5s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animaciones */
.custom-classes-enter-active {
  animation: fadeIn 0.5s ease-in;
}

.custom-classes-leave-active {
  animation: fadeOut 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style> 