<template>
  <div class="min-h-screen">
    <!-- Hero Section con Carrusel -->
    <section class="relative py-12 overflow-hidden">
      <div class="container mx-auto px-4">
        <!-- Encabezado -->
        <div class="max-w-4xl mx-auto text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3d4e6c] to-[#5a6d8f] dark:from-[#7389ae] dark:to-[#a3b3d1] mb-4">
            Últimas Noticias
          </h1>
          <div class="h-1 w-24 bg-gradient-to-r from-[#3d4e6c] to-[#5a6d8f] mx-auto mb-6"></div>
        </div>

        <!-- Carrusel Principal -->
        <div class="relative max-w-7xl mx-auto bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
             @mouseenter="pauseCarousel"
             @mouseleave="resumeCarousel">
          <div class="flex transition-transform duration-700 ease-out" 
               :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(noticia, index) in noticias" :key="index" 
                 class="w-full flex-shrink-0">
              <div class="grid lg:grid-cols-2 gap-0">
                <!-- Imagen -->
                <div class="relative h-[400px] overflow-hidden">
                  <img 
                    :src="noticia.imagen" 
                    :alt="noticia.titulo" 
                    class="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                    @error="handleImageError"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <!-- Contenido -->
                <div class="relative p-8 lg:p-12 flex flex-col justify-center">
                  <div class="flex items-center gap-3 mb-4">
                    <span class="px-4 py-1.5 text-sm font-medium bg-[#3d4e6c]/15 dark:bg-[#3d4e6c]/25 text-[#2c3b53] dark:text-white rounded-full">
                      {{ noticia.categoria }}
                    </span>
                    <time class="text-sm text-[#2c3b53] dark:text-[#f4f6f9] flex items-center">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ noticia.fecha }}
                    </time>
                  </div>

                  <h2 class="text-3xl font-bold text-[#2c3b53] dark:text-[#e2e8f0] hover:text-[#4c6185] dark:hover:text-[#a3b3d1] transition-colors duration-300 mb-4 min-h-[4.5rem]">
                    {{ noticia.titulo }}
                  </h2>

                  <p class="text-[#4a5568] dark:text-[#cbd5e0] mb-4 line-clamp-2">
                    {{ noticia.descripcion }}
                  </p>

                  <button 
                    @click="leerMas(noticia)"
                    class="inline-flex items-center justify-center px-5 py-1 text-sm font-medium text-white bg-[#4c6185] hover:bg-[#5d7499] dark:bg-[#3d4e6c] dark:hover:bg-[#5a6d8f] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d4e6c]/50 dark:focus:ring-offset-[#1a2234] w-auto group"
                  >
                    <span>Leer artículo completo</span>
                    <svg class="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Controles del Carrusel -->
          <div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <button 
              @click="prevSlide" 
              class="p-3 rounded-full bg-[#3d4e6c]/40 backdrop-blur-sm hover:bg-[#3d4e6c]/60 transition-all duration-300 transform hover:scale-105 pointer-events-auto group"
            >
              <svg class="w-6 h-6 text-[#f4f6f9] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              @click="nextSlide" 
              class="p-3 rounded-full bg-[#3d4e6c]/40 backdrop-blur-sm hover:bg-[#3d4e6c]/60 transition-all duration-300 transform hover:scale-105 pointer-events-auto group"
            >
              <svg class="w-6 h-6 text-[#f4f6f9] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Indicadores de diapositivas -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            <button 
              v-for="(_, index) in noticias" 
              :key="index"
              @click="goToSlide(index)"
              class="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none"
              :class="currentSlide === index ? 'bg-[#5a6d8f] scale-125' : 'bg-[#3d4e6c]/50 hover:bg-[#3d4e6c]/70'"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Noticias Recomendadas -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-[#2c3b53] dark:text-[#e2e8f0] mb-8">
            Noticias Recomendadas
          </h2>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(noticia, index) in noticiasRecomendadas" :key="index"
                 class="relative bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
              <div class="relative h-48">
                <img 
                  :src="noticia.imagen" 
                  :alt="noticia.titulo"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span class="absolute bottom-4 left-4 px-3 py-1 text-xs font-medium bg-[#3d4e6c]/15 dark:bg-[#3d4e6c]/25 text-[#3d4e6c] dark:text-[#7389ae] rounded-full">
                  {{ noticia.categoria }}
                </span>
              </div>

              <div class="p-6 flex flex-col h-[calc(100%-12rem)]">
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ noticia.fecha }}
                </div>

                <h3 class="text-xl font-semibold text-[#2c3b53] dark:text-[#e2e8f0] hover:text-[#4c6185] dark:hover:text-[#a3b3d1] transition-colors duration-300 mb-3">
                  {{ noticia.titulo }}
                </h3>

                <p class="text-[#4a5568] dark:text-[#cbd5e0] mb-4 line-clamp-2">
                  {{ noticia.descripcion }}
                </p>

                <button 
                  @click="leerMas(noticia)"
                  class="text-[#4c6185] dark:text-[#7389ae] hover:text-[#5d7499] dark:hover:text-[#5a6d8f] font-medium inline-flex items-center transition-all duration-300 mt-auto group"
                >
                  <span class="border-b-2 border-transparent group-hover:border-current transition-colors">Leer más</span>
                  <svg class="ml-1 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onErrorCaptured, watch } from 'vue';
import { useSharedStore } from '../stores/sharedStore';
import eventBus, { EventTypes } from '../utils/eventBus';
import NoticiaDetalle from '../components/NoticiaDetalle.vue';
import { noticias as noticiasData } from '../utils/noticias';

// Importar imágenes
import imagen1 from '../assets/img/noticias/1.jpg';
import imagen2 from '../assets/img/noticias/2.jpg';
import imagen3 from '../assets/img/noticias/3.webp';
import imagen4 from '../assets/img/noticias/4.jpg';

// Mapeo de imágenes
const imagenes = [imagen1, imagen2, imagen3, imagen4];

const props = defineProps({
  theme: {
    type: String,
    default: 'light'
  }
});

const sharedStore = useSharedStore();
const currentSlide = ref(0);
const autoplayInterval = ref(null);
const isHovered = ref(false);

// Noticias principales (4 más recientes)
const noticias = ref(noticiasData.slice(0, 4).map((noticia, index) => ({
  titulo: noticia.titulo,
  descripcion: noticia.resumen,
  imagen: imagenes[index],
  fecha: noticia.fecha,
  categoria: noticia.categoria,
  contenido: noticia.contenido
})));

// Noticias recomendadas (resto de noticias)
const noticiasRecomendadas = ref(noticiasData.slice(4).map((noticia, index) => ({
  titulo: noticia.titulo,
  descripcion: noticia.resumen,
  imagen: imagenes[index % 4], // Reutilizamos las imágenes en ciclo
  fecha: noticia.fecha,
  categoria: noticia.categoria,
  contenido: noticia.contenido
})));

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % noticias.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + noticias.value.length) % noticias.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  if (!isHovered.value) {
    autoplayInterval.value = setInterval(() => {
      nextSlide();
    }, 8000);
  }
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

const pauseCarousel = () => {
  isHovered.value = true;
  stopAutoplay();
};

const resumeCarousel = () => {
  isHovered.value = false;
  startAutoplay();
};

const leerMas = (noticia) => {
  eventBus.emit(EventTypes.SHOW_MODAL, {
    title: 'Detalle de la Noticia',
    component: NoticiaDetalle,
    props: {
      noticia
    },
    hideActions: true
  });
};

const handleImageError = (event) => {
  event.target.style.display = 'none';
};

const updateTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

onMounted(() => {
  updateTheme(props.theme);
  startAutoplay();
});

watch(() => props.theme, (newTheme) => {
  updateTheme(newTheme);
});

onErrorCaptured((error, instance, info) => {
  console.error('Error en componente Home:', error);
  return false;
});
</script>

<style>
@import 'tailwindcss/base';

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animaciones suaves */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto de gradiente en el fondo */
.bg-gradient-overlay {
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
}
</style>
