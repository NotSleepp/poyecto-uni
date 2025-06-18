<template>
  <div class="min-h-screen py-8 bg-gradient-to-br from-gray-50 dark:from-gray-900/40 to-gray-100 dark:to-gray-900/60">
    <div class="container mx-auto px-4">
      <!-- Encabezado -->
      <div class="sticky top-0 z-10 mb-8 animate-fadeIn">
        <BaseCard wrapperClass="backdrop-blur-md bg-white/95 dark:bg-gray-800/95">
          <div class="p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center shadow-inner">
                  <BookOpenIcon class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Catálogo de Biblioteca</h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Explora nuestra colección física</p>
                </div>
              </div>
              <div class="inline-flex items-center py-2 px-4 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {{ catalogosMostrados.length }} ejemplares encontrados
              </div>
            </div>

            <!-- Filtros -->
            <div class="grid grid-cols-1 gap-4">
              <!-- Buscador -->
              <div class="col-span-1">
                <div class="relative">
                  <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Buscar por título, autor, temática o editorial..."
                    class="w-full pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Select sede -->
                <div class="form-control">
                  <div class="relative">
                    <MapPinIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      v-model="selectedSede"
                      class="w-full capitalize rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Todas las sedes</option>
                      <option v-for="sede in sedes" :key="sede.pksede" :value="sede.pksede" class="capitalize">
                        {{ sede.sede?.toLowerCase() }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Botón buscar -->
                <div class="form-control">
                  <button class="inline-flex justify-center items-center w-full gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors" @click="buscarCatalogos">
                    <MagnifyingGlassIcon class="w-5 h-5" />
                    Buscar
                  </button>
                </div>

                <!-- Botón bibliotecas electrónicas -->
                <div>
                  <button class="inline-flex justify-center items-center w-full gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-2.5 rounded-lg shadow-sm transition-colors" @click="mostrarBibliotecasElectronicas">
                    <BuildingLibraryIcon class="w-5 h-5" />
                    Bibliotecas Electrónicas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Resultados o placeholders -->
      <div class="animate-fadeIn">
        <div v-if="catalogosMostrados.length === 0 && !cargando" class="">
          <BaseCard wrapperClass="p-8 bg-white/95 dark:bg-gray-800/95">
            <div class="flex flex-col items-center justify-center text-center">
              <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6 shadow-inner">
                <FaceFrownIcon class="w-12 h-12 text-gray-400" />
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">No se encontraron resultados</h3>
              <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Intenta cambiar los filtros o usar términos de búsqueda diferentes</p>
              <button v-if="searchQuery || selectedSede" @click="limpiarFiltros" class="inline-flex items-center gap-2 mt-6 px-6 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <XMarkIcon class="w-4 h-4" />
                Limpiar filtros
              </button>
            </div>
          </BaseCard>
        </div>

        <!-- Tarjetas -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="catalogo in catalogosMostrados" :key="catalogo.pkejemplar" class="h-full flex flex-col">
            <BaseCard wrapperClass="h-full flex flex-col hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 hover:border-primary-500">
              <div class="p-5 flex flex-col justify-between h-full">
                <h2 class="text-lg font-bold text-primary-600 dark:text-primary-400 line-clamp-2">{{ catalogo.titulo?.trim() }}</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{{ catalogo.autores }}</p>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Sentinel infinite scroll -->
        <div ref="observador" class="w-full h-24 flex items-center justify-center mt-8" v-if="hayMasCatalogos">
          <div class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-primary-100/30 dark:bg-primary-900/10 flex items-center justify-center animate-pulse">
              <ArrowPathIcon class="w-6 h-6 text-primary-600 animate-spin-slow" />
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Cargando más ejemplares...</span>
          </div>
        </div>
      </div>

      <!-- Modal bibliotecas electrónicas -->
      <dialog ref="modalBibliotecas" class="modal">
        <div class="w-11/12 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div class="p-6">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-primary-100/50 dark:bg-primary-900/20 flex items-center justify-center">
                  <BuildingLibraryIcon class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">Bibliotecas Electrónicas</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Acceso externo</p>
                </div>
              </div>
              <button 
                @click="cerrarModal"
                class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Lista de bibliotecas -->
            <div class="space-y-3">
              <a
                v-for="b in bibliotecasElectronicas"
                :key="b.nombre"
                :href="b.url"
                target="_blank"
                class="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-100/50 dark:bg-primary-900/20 flex items-center justify-center">
                    <LinkIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-gray-900 dark:text-white truncate">{{ b.nombre }}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Acceso externo</p>
                  </div>
                  <ArrowTopRightOnSquareIcon class="w-5 h-5 text-gray-400" />
                </div>
              </a>
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
import { BookOpenIcon, MagnifyingGlassIcon, MapPinIcon, BuildingLibraryIcon, FaceFrownIcon, ArrowPathIcon, XMarkIcon, LinkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import BaseCard from '../components/BaseCard.vue';

const paginaActual = ref(1);
const catalogosPorPagina = 12;
const catalogos = ref([]);
const hayMasCatalogos = ref(true);
const cargando = ref(false);

const searchQuery = ref('');
const selectedSede = ref('');
const sedes = ref([]);

// Bibliotecas electrónicas estáticas
const bibliotecasElectronicas = [
  { nombre: 'Biblioteca Electrónica de Ciencia y Tecnología', url: 'https://biblioteca.mincyt.gob.ar/' },
  { nombre: 'BVSalud LILACS', url: 'https://lilacs.bvsalud.org/es/' },
  { nombre: 'SAIJ – Información Jurídica', url: 'http://www.saij.gob.ar/' },
  { nombre: 'DOAJ – Directorio de Revistas OA', url: 'https://doaj.org/' },
  { nombre: 'ROAR – Registro de Repositorios OA', url: 'http://roar.eprints.org/' },
];

const catalogosMostrados = computed(() => catalogos.value.slice(0, paginaActual.value * catalogosPorPagina));

const limpiarFiltros = () => {
  searchQuery.value = '';
  selectedSede.value = '';
  buscarCatalogos();
};

const buscarCatalogos = async () => {
  try {
    cargando.value = true;
    paginaActual.value = 1;

    const params = new URLSearchParams({
      busqueda: searchQuery.value || '',
      sede: selectedSede.value || '',
      pagina: paginaActual.value.toString(),
      limite: catalogosPorPagina.toString(),
    });

    const res = await apiFetch(`/api/biblioteca/catalogo?${params.toString()}`);
    const arr = extractArray(res);
    catalogos.value = arr.map((c) => ({
      ...c,
      titulo: decodeLatin1((c.titulo ?? '').trim()),
      autores: decodeLatin1(c.autores ?? ''),
    }));
    hayMasCatalogos.value = catalogos.value.length > catalogosPorPagina;
  } catch (e) {
    console.error(e);
  } finally {
    cargando.value = false;
  }
};

const observador = ref(null);
const cargarMas = () => {
  if (cargando.value || !hayMasCatalogos.value) return;
  paginaActual.value += 1;
  if (catalogosMostrados.value.length >= catalogos.value.length) hayMasCatalogos.value = false;
};

let io;
onMounted(async () => {
  await obtenerSedes();
  await buscarCatalogos();

  io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) cargarMas();
  });

  watch(() => observador.value, (el) => {
    if (el) io.observe(el);
  }, { immediate: true });
});

onUnmounted(() => {
  cerrarModal();
  io?.disconnect();
});

// Helpers de respuesta y decodificación -------------
function extractArray (res) {
  return Array.isArray(res) ? res : (res?.datos ?? []);
}

function decodeLatin1 (str) {
  try { return decodeURIComponent(escape(str)); } catch { return str; }
}

const obtenerSedes = async () => {
  const res = await apiFetch('/api/general/sedes');
  console.log('Sedes raw', res);
  sedes.value = extractArray(res).map((s) => ({
    ...s,
    sede: decodeLatin1(s.sede ?? '')
  }));
  console.log('Sedes procesadas', sedes.value);
};

const modalBibliotecas = ref(null);

const cerrarModal = () => {
  if (modalBibliotecas.value) {
    modalBibliotecas.value.close();
  }
};

const mostrarBibliotecasElectronicas = () => {
  modalBibliotecas.value?.showModal();
};
</script>

<style scoped>
@keyframes spin-slow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
.animate-spin-slow { animation: spin-slow 2s linear infinite }

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
