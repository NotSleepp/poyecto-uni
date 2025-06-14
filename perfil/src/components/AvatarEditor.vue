<template>
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Personalizar Avatar</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Creá tu avatar personalizado</p>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Vista previa fija -->
        <div class="lg:col-span-1">
          <div class="sticky top-6">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Vista Previa</h4>
              <div class="flex justify-center mb-6">
                <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                  <img :src="avatarUrl" alt="Vista previa del avatar" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="space-y-3">
                <button
                  @click="saveAvatar"
                  class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div class="flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Guardar Avatar
                  </div>
                </button>
                <button
                  @click="randomizeAvatar"
                  class="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div class="flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Avatar Aleatorio
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Opciones de personalización -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Cabello -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h5 class="text-lg font-semibold text-gray-900 dark:text-white">Peinado</h5>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              <button
                v-for="hair in hairOptions"
                :key="hair.value"
                @click="avatarConfig.topType = hair.value"
                class="group relative p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium text-center hover:shadow-md transform hover:scale-105"
                :class="avatarConfig.topType === hair.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex flex-col items-center gap-1">
                  <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <span class="text-xs leading-tight">{{ hair.label }}</span>
                </div>
                <div v-if="avatarConfig.topType === hair.value" class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
  
          <!-- Vello facial -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h5 class="text-lg font-semibold text-gray-900 dark:text-white">Barba y Bigote</h5>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <button
                v-for="facial in facialHairOptions"
                :key="facial.value"
                @click="avatarConfig.facialHairType = facial.value"
                class="group relative p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium text-center hover:shadow-md transform hover:scale-105"
                :class="avatarConfig.facialHairType === facial.value 
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex flex-col items-center gap-1">
                  <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span class="text-xs leading-tight">{{ facial.label }}</span>
                </div>
                <div v-if="avatarConfig.facialHairType === facial.value" class="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
  
          <!-- Ropa -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <h5 class="text-lg font-semibold text-gray-900 dark:text-white">Vestimenta</h5>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <button
                v-for="cloth in clotheOptions"
                :key="cloth.value"
                @click="avatarConfig.clotheType = cloth.value"
                class="group relative p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium text-center hover:shadow-md transform hover:scale-105"
                :class="avatarConfig.clotheType === cloth.value 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex flex-col items-center gap-1">
                  <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                  </div>
                  <span class="text-xs leading-tight">{{ cloth.label }}</span>
                </div>
                <div v-if="avatarConfig.clotheType === cloth.value" class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
  
          <!-- Ojos -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h5 class="text-lg font-semibold text-gray-900 dark:text-white">Expresión</h5>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <button
                v-for="eye in eyeOptions"
                :key="eye.value"
                @click="avatarConfig.eyeType = eye.value"
                class="group relative p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium text-center hover:shadow-md transform hover:scale-105"
                :class="avatarConfig.eyeType === eye.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex flex-col items-center gap-1">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <span class="text-xs leading-tight">{{ eye.label }}</span>
                </div>
                <div v-if="avatarConfig.eyeType === eye.value" class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
  
          <!-- Accesorios -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                <svg class="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h5 class="text-lg font-semibold text-gray-900 dark:text-white">Anteojos</h5>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <button
                v-for="accessory in accessoryOptions"
                :key="accessory.value"
                @click="avatarConfig.accessoriesType = accessory.value"
                class="group relative p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium text-center hover:shadow-md transform hover:scale-105"
                :class="avatarConfig.accessoriesType === accessory.value 
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex flex-col items-center gap-1">
                  <div class="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <span class="text-xs leading-tight">{{ accessory.label }}</span>
                </div>
                <div v-if="avatarConfig.accessoriesType === accessory.value" class="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import eventBus, { EventTypes } from 'host/eventBus';
  
  const emit = defineEmits(['avatar-saved']);
  
  const avatarConfig = ref({
    avatarStyle: 'Transparent',
    topType: 'ShortHairShortFlat',
    facialHairType: 'BeardMedium',
    clotheType: 'Hoodie',
    eyeType: 'Wink',
    accessoriesType: 'Blank'
  });
  
  // Cargar configuración guardada
  onMounted(() => {
    const savedConfig = localStorage.getItem('avatarConfig');
    if (savedConfig) {
      avatarConfig.value = { ...avatarConfig.value, ...JSON.parse(savedConfig) };
    }
  });
  
  const hairOptions = [
    { value: 'NoHair', label: 'Sin pelo' },
    { value: 'Eyepatch', label: 'Parche' },
    { value: 'Hat', label: 'Gorro' },
    { value: 'Hijab', label: 'Hijab' },
    { value: 'Turban', label: 'Turbante' },
    { value: 'WinterHat1', label: 'Gorro 1' },
    { value: 'WinterHat2', label: 'Gorro 2' },
    { value: 'WinterHat3', label: 'Gorro 3' },
    { value: 'WinterHat4', label: 'Gorro 4' },
    { value: 'LongHairBigHair', label: 'Pelo largo' },
    { value: 'LongHairBob', label: 'Bob largo' },
    { value: 'LongHairBun', label: 'Rodete' },
    { value: 'LongHairCurly', label: 'Rulos largos' },
    { value: 'LongHairCurvy', label: 'Ondas largas' },
    { value: 'LongHairDreads', label: 'Rastas largas' },
    { value: 'LongHairFrida', label: 'Estilo Frida' },
    { value: 'LongHairFro', label: 'Afro largo' },
    { value: 'LongHairFroBand', label: 'Afro con vincha' },
    { value: 'LongHairNotTooLong', label: 'Melena' },
    { value: 'LongHairShavedSides', label: 'Rapado costados' },
    { value: 'LongHairMiaWallace', label: 'Mia Wallace' },
    { value: 'LongHairStraight', label: 'Liso largo' },
    { value: 'LongHairStraight2', label: 'Liso largo 2' },
    { value: 'LongHairStraightStrand', label: 'Mechón largo' },
    { value: 'ShortHairDreads01', label: 'Rastas cortas' },
    { value: 'ShortHairDreads02', label: 'Rastas cortas 2' },
    { value: 'ShortHairFrizzle', label: 'Corto rizado' },
    { value: 'ShortHairShaggyMullet', label: 'Mullet' },
    { value: 'ShortHairShortCurly', label: 'Corto con rulos' },
    { value: 'ShortHairShortFlat', label: 'Corto liso' },
    { value: 'ShortHairShortRound', label: 'Corto redondo' },
    { value: 'ShortHairShortWaved', label: 'Corto ondulado' },
    { value: 'ShortHairSides', label: 'Rapado' },
    { value: 'ShortHairTheCaesar', label: 'César' },
    { value: 'ShortHairTheCaesarSidePart', label: 'César con raya' }
  ];
  
  const facialHairOptions = [
    { value: 'Blank', label: 'Sin barba' },
    { value: 'BeardMedium', label: 'Barba media' },
    { value: 'BeardLight', label: 'Barba corta' },
    { value: 'BeardMajestic', label: 'Barba larga' },
    { value: 'MoustacheFancy', label: 'Bigote elegante' },
    { value: 'MoustacheMagnum', label: 'Bigote grueso' }
  ];
  
  const clotheOptions = [
    { value: 'BlazerShirt', label: 'Saco' },
    { value: 'BlazerSweater', label: 'Saco con buzo' },
    { value: 'CollarSweater', label: 'Buzo con cuello' },
    { value: 'GraphicShirt', label: 'Remera estampada' },
    { value: 'Hoodie', label: 'Buzo canguro' },
    { value: 'Overall', label: 'Mameluco' },
    { value: 'ShirtCrewNeck', label: 'Remera básica' },
    { value: 'ShirtScoopNeck', label: 'Remera escote' },
    { value: 'ShirtVNeck', label: 'Remera escote V' }
  ];
  
  const eyeOptions = [
    { value: 'Close', label: 'Ojos cerrados' },
    { value: 'Cry', label: 'Llorando' },
    { value: 'Default', label: 'Normal' },
    { value: 'Dizzy', label: 'Mareado' },
    { value: 'EyeRoll', label: 'Ojos en blanco' },
    { value: 'Happy', label: 'Contento' },
    { value: 'Hearts', label: 'Enamorado' },
    { value: 'Side', label: 'Mirando al costado' },
    { value: 'Squint', label: 'Entrecerrados' },
    { value: 'Surprised', label: 'Sorprendido' },
    { value: 'Wink', label: 'Guiñando' },
    { value: 'WinkWacky', label: 'Guiño loco' }
  ];
  
  const accessoryOptions = [
    { value: 'Blank', label: 'Sin anteojos' },
    { value: 'Kurt', label: 'Anteojos Kurt' },
    { value: 'Prescription01', label: 'Anteojos receta' },
    { value: 'Prescription02', label: 'Anteojos receta 2' },
    { value: 'Round', label: 'Anteojos redondos' },
    { value: 'Sunglasses', label: 'Anteojos de sol' },
    { value: 'Wayfarers', label: 'Wayfarers' }
  ];
  
  const avatarUrl = computed(() => {
    const params = new URLSearchParams(avatarConfig.value);
    return `https://avataaars.io/?${params.toString()}`;
  });
  
  const randomizeAvatar = () => {
    avatarConfig.value = {
      avatarStyle: 'Transparent',
      topType: hairOptions[Math.floor(Math.random() * hairOptions.length)].value,
      facialHairType: facialHairOptions[Math.floor(Math.random() * facialHairOptions.length)].value,
      clotheType: clotheOptions[Math.floor(Math.random() * clotheOptions.length)].value,
      eyeType: eyeOptions[Math.floor(Math.random() * eyeOptions.length)].value,
      accessoriesType: accessoryOptions[Math.floor(Math.random() * accessoryOptions.length)].value
    };
  };
  
  const saveAvatar = () => {
    // Guardar URL y configuración en localStorage
    localStorage.setItem('userAvatar', avatarUrl.value);
    localStorage.setItem('avatarConfig', JSON.stringify(avatarConfig.value));
    
    // Emitir evento para actualizar el avatar en el perfil
    eventBus.emit('avatar-updated', avatarUrl.value);
    
    // Cerrar modal
    eventBus.emit(EventTypes.HIDE_MODAL);
  };
  </script>