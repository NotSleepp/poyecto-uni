<template>
  <!-- Encabezado y filtros -->
  <div class="min-h-screen py-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900/40 dark:via-gray-900 dark:to-gray-900/60">
    <div class="container mx-auto px-4 space-y-8">
      <!-- Tarjeta principal con buscador y filtros -->
      <div class="sticky top-4 z-10 animate-fadeIn">
        <BaseCard wrapperClass="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80">
          <div class="p-6 space-y-6">
            <!-- Título + contador -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 dark:from-primary-400/10 dark:to-primary-500/10 flex items-center justify-center shadow-inner">
                  <BookOpenIcon class="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Biblioteca Virtual
                  </h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Accede a recursos académicos digitales
                  </p>
                </div>
              </div>

              <div class="inline-flex items-center py-2 px-4 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50">
                {{ librosMostrados.length }} recursos encontrados
              </div>
            </div>

            <!-- Buscador y filtros -->
            <div class="grid grid-cols-1 gap-4">
              <!-- input buscador -->
              <div class="col-span-1">
                <div class="relative group">
                  <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 group-focus-within:text-primary-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
                  <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Buscar por título, autor o temática..."
                    class="w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                  />
                </div>
              </div>

              <!-- selects y botón buscar -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Facultad -->
                <div class="form-control">
                  <div class="relative group">
                    <AcademicCapIcon class="w-5 h-5 text-gray-400 group-focus-within:text-primary-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
                    <select
                      v-model="selectedFacultad"
                      class="w-full capitalize rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow appearance-none"
                    >
                      <option value="">Todas las facultades</option>
                      <option
                        v-for="facultad in facultades"
                        :key="facultad.pkfacultad"
                        :value="facultad.pkfacultad"
                        class="capitalize"
                      >
                        {{ facultad.facultad }}
                      </option>
                    </select>
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon class="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <!-- Tipo -->
                <div class="form-control">
                  <div class="relative group">
                    <Squares2X2Icon class="w-5 h-5 text-gray-400 group-focus-within:text-primary-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
                    <select
                      v-model="selectedTipo"
                      class="w-full capitalize rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow appearance-none"
                    >
                      <option value="">Todos los tipos</option>
                      <option
                        v-for="tipo in tiposArchivo"
                        :key="tipo.pktipo"
                        :value="tipo.pktipo"
                        class="capitalize"
                      >
                        {{ tipo.tipo }}
                      </option>
                    </select>
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDownIcon class="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <!-- Botón buscar -->
                <div>
                  <button
                    class="inline-flex justify-center items-center w-full gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-primary-500/25 hover:shadow-lg active:scale-[0.98]"
                    @click="buscarLibros"
                  >
                    <MagnifyingGlassIcon class="w-5 h-5" />
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Resultados y placeholder de carga -->
      <div class="animate-fadeIn space-y-8">
        <!-- Placeholder sin resultados -->
        <div
          v-if="librosMostrados.length === 0 && !cargando"
          class="animate-fadeIn"
        >
          <BaseCard wrapperClass="p-12 bg-white/95 dark:bg-gray-800/95">
            <div class="flex flex-col items-center justify-center text-center">
              <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center mb-6 shadow-inner">
                <FaceFrownIcon class="w-12 h-12 text-gray-400" />
              </div>
              <h3 class="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                No se encontraron resultados
              </h3>
              <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Intenta cambiar los filtros o usar términos de búsqueda diferentes
              </p>
              <button
                v-if="searchQuery || selectedFacultad || selectedTipo"
                @click="limpiarFiltros"
                class="inline-flex items-center gap-2 mt-6 px-6 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon class="w-4 h-4" />
                Limpiar filtros
              </button>
            </div>
          </BaseCard>
        </div>

        <!-- Placeholder de carga -->
        <div
          v-else-if="cargando && librosMostrados.length === 0"
          class="animate-fadeIn"
        >
          <BaseCard wrapperClass="p-12 bg-white/95 dark:bg-gray-800/95">
            <div class="flex flex-col items-center justify-center text-center">
              <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center mb-6">
                <ArrowPathIcon class="w-12 h-12 text-primary-600 dark:text-primary-400 animate-spin-slow" />
              </div>
              <h3 class="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                Buscando recursos
              </h3>
              <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Estamos encontrando los mejores recursos para ti...
              </p>
            </div>
          </BaseCard>
        </div>

        <!-- Resultado tarjetas -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="libro in librosMostrados"
            :key="libro.pkmaterial || libro.id"
            class="h-full flex flex-col"
          >
            <BaseCard 
              wrapperClass="h-full flex flex-col hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 cursor-pointer group"
              :is-hoverable="true"
              @click="mostrarDetalle(libro)"
            >
              <div class="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 class="text-lg font-bold text-primary-600 dark:text-primary-400 line-clamp-2 mb-2 group-hover:text-primary-500 transition-colors">
                    {{ libro.titulo }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {{ libro.autores?.replaceAll('_', ', ') || 'Sin datos de Autor' }}
                  </p>
                </div>

                <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                    {{ libro.tipo.includes('PDF') ? 'PDF' : libro.tipo.includes('DOC') ? 'DOC' : libro.tipo.includes('TIF') ? 'TIF' : libro.tipo.includes('Link') ? 'LINK' : libro.tipo }}
                  </span>
                  <span
                    v-for="fac in libro.facultades.split(',')"
                    :key="fac"
                    class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-secondary-100 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400"
                  >
                    {{ fac.trim() }}
                  </span>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Infinite scroll sentinel -->
        <div
          ref="observador"
          class="w-full h-24 flex items-center justify-center"
          v-if="hayMasLibros"
        >
          <div class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-primary-100/30 dark:bg-primary-900/10 flex items-center justify-center animate-pulse">
              <ArrowPathIcon class="w-6 h-6 text-primary-600 dark:text-primary-400 animate-spin-slow" />
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Cargando más recursos...</span>
          </div>
        </div>
      </div>

      <!-- Modal de detalle -->
      <dialog ref="modalDetalle" class="modal" @close="libroSeleccionado = null">
        <div class="w-11/12 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div class="p-6" v-if="libroSeleccionado">
            <!-- Header -->
            <div class="flex justify-between items-start mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ libroSeleccionado.titulo }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ libroSeleccionado.autores?.replaceAll('_', ', ') || 'Sin datos de Autor' }}
                </p>
              </div>
              <button 
                @click="cerrarModal"
                class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div class="space-y-6">
              <!-- Descripción -->
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Descripción</h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ libroSeleccionado.descripcion || 'Sin descripción disponible' }}
                </p>
              </div>

              <!-- Temáticas -->
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Temáticas</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tematica in (libroSeleccionado.tematicas?.split(',') || [])"
                    :key="tematica"
                    class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {{ tematica.trim() }}
                  </span>
                </div>
              </div>

              <!-- Facultades -->
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Facultades</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="facultad in libroSeleccionado.facultades.split(',')"
                    :key="facultad"
                    class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-secondary-100 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400"
                  >
                    {{ facultad.trim() }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                @click="cerrarModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cerrar
              </button>
              <button
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              >
                Descargar recurso
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { apiFetch } from '../utils/api';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  Squares2X2Icon, 
  MagnifyingGlassIcon, 
  FaceFrownIcon, 
  ArrowPathIcon, 
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline';
import BaseCard from '../components/BaseCard.vue';

// Parámetros y estado
const paginaActual = ref(1);
const librosPorPagina = 12;
const libros = ref([]);
const hayMasLibros = ref(true);
const cargando = ref(false);

// Filtros
const searchQuery = ref('');
const selectedFacultad = ref('');
const selectedTipo = ref('');

// Listas obtenidas desde API
const facultades = ref([]);
const tiposArchivo = ref([]);

const observador = ref(null);
const modalDetalle = ref(null);
const libroSeleccionado = ref(null);

// Computed para paginación
const librosMostrados = computed(() => {
  return libros.value.slice(0, paginaActual.value * librosPorPagina);
});

// Métodos de interacción (buscar, limpiar, modal, etc.)
const limpiarFiltros = () => {
  searchQuery.value = '';
  selectedFacultad.value = '';
  selectedTipo.value = '';
  buscarLibros();
};

const buscarLibros = async () => {
  try {
    cargando.value = true;
    paginaActual.value = 1;

    const params = new URLSearchParams({
      busqueda: searchQuery.value || '',
      facultad: selectedFacultad.value || '',
      tipo: selectedTipo.value || '',
      pagina: paginaActual.value.toString(),
      limite: librosPorPagina.toString(),
    });

    const data = await apiFetch(`/api/biblioteca/libros?${params.toString()}`);

    const arr = extractArray(data);
    libros.value = arr.map((l) => ({
      ...l,
      titulo: decodeLatin1(l.titulo ?? '').trim(),
      autores: decodeLatin1(l.autores ?? ''),
      facultades: decodeLatin1(l.facultades ?? ''),
      tematicas: decodeLatin1(l.tematicas ?? ''),
      descripcion: decodeLatin1(l.descripcion ?? ''),
      tipo: decodeLatin1(l.tipo ?? '').replaceAll('_', ', ')
    }));
    hayMasLibros.value = libros.value.length > librosPorPagina;
  } catch (e) {
    console.error(e);
  } finally {
    cargando.value = false;
  }
};

// Manejo del modal
const cerrarModal = () => {
  if (modalDetalle.value) {
    modalDetalle.value.close();
    libroSeleccionado.value = null;
  }
};

const mostrarDetalle = (libro) => {
  libroSeleccionado.value = libro;
  modalDetalle.value?.showModal();
};

// Infinite scroll con IntersectionObserver
const cargarMasLibros = () => {
  if (cargando.value || !hayMasLibros.value) return;
  paginaActual.value += 1;
  if (librosMostrados.value.length >= libros.value.length) {
    hayMasLibros.value = false;
  }
};

let io;
onMounted(async () => {
  await Promise.all([obtenerFacultades(), obtenerTiposArchivo()]);
  await buscarLibros();

  io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) cargarMasLibros();
  });

  watch(() => observador.value, (el) => {
    if (el) io.observe(el);
  }, { immediate: true });
});

onUnmounted(() => {
  cerrarModal();
  io?.disconnect();
});

// Fetch auxiliares
const obtenerFacultades = async () => {
  const res = await apiFetch('/api/general/facultades');
  console.log('Facultades raw', res);
  const arr = extractArray(res);
  facultades.value = arr.map((f) => ({
    ...f,
    facultad: decodeLatin1(f.facultad ?? '')
  }));
  console.log('Facultades procesadas', facultades.value);
};

const obtenerTiposArchivo = async () => {
  const res = await apiFetch('/api/general/tiposArchivos');
  console.log('Tipos archivo raw', res);
  const arr = extractArray(res);
  tiposArchivo.value = arr.map((t) => ({
    ...t,
    tipo: decodeLatin1(t.tipo ?? '').replaceAll('_', ', ')
  }));
  console.log('Tipos archivo procesados', tiposArchivo.value);
};

// Utils ------------------------------
function extractArray (res) {
  // Si la respuesta ya es un array lo devolvemos tal cual, si viene dentro de { datos: [] } lo extraemos, en caso contrario devolvemos []
  return Array.isArray(res) ? res : (res?.datos ?? []);
}

// Utils para normalizar y formatear cadenas que vienen mal codificadas desde el backend
function decodeLatin1 (str) {
  try {
    // Convierte una cadena ISO-8859-1 mal interpretada como UTF-8 a la representación correcta
    // "escape" y "decodeURIComponent" están deprecados pero funcionan bien para este caso puntual
    // Si llegasen a fallar simplemente se devuelve la cadena original
    return decodeURIComponent(escape(str));
  } catch {
    return str;
  }
}

function toTitleCase (str) {
  return str
    .toLocaleLowerCase('es-ES')
    .split(' ') // separa por espacios manteniendo tildes
    .map((w) => w.charAt(0).toLocaleUpperCase('es-ES') + w.slice(1))
    .join(' ');
}
</script>

<style scoped>
/* animación lenta para icono de carga */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}

/* Animaciones de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Estilos para el modal */
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 1rem;
  border: none;
  background: transparent;
  outline: none !important;
  max-height: calc(100vh - 2rem);
  max-width: 100vw;
  overflow: visible;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Eliminar bordes nativos del dialog */
dialog:focus {
  outline: none;
}

dialog::-webkit-scrollbar {
  display: none;
}

/* Asegurar que el modal se cierre correctamente */
dialog[open] {
  display: block;
}

dialog:not([open]) {
  display: none;
}
</style>
