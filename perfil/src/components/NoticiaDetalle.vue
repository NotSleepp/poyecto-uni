<template>
  <div class="max-w-4xl mx-auto">
    <!-- Hero Image -->
    <div class="relative h-[300px] md:h-[400px] -mx-6 -mt-6 mb-8 overflow-hidden ">
      <img 
        :src="noticia.imagen" 
        :alt="noticia.titulo" 
        class="w-full h-full object-cover"
        @error="handleImageError"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-[#1c2533]/90 via-[#1c2533]/50 to-transparent"></div>
      
      <!-- Categoría y Fecha -->
      <div class="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
        <span class="px-4 py-1.5 text-sm font-medium bg-[#f4f6f9]/10 text-white rounded-full backdrop-blur-sm border border-white/10">
          {{ noticia.categoria }}
        </span>
        <time class="text-sm text-white flex items-center backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ noticia.fecha }}
        </time>
      </div>
    </div>

    <!-- Contenido -->
    <div class="space-y-6 px-6">
      <h1 class="text-3xl md:text-4xl font-bold text-[#2c3b53] dark:text-white leading-tight">
        {{ noticia.titulo }}
      </h1>

      <!-- Resumen -->
      <div class="border-l-4 border-[#3d4e6c] pl-4 py-3 bg-[#f4f6f9] dark:bg-[#2c3b53]/30 rounded-r-xl">
        <p class="text-lg text-[#3d4e6c] dark:text-[#f4f6f9] italic">
          {{ noticia.descripcion }}
        </p>
      </div>

      <!-- Contenido Principal -->
      <div class="prose prose-lg max-w-none">
        <div v-html="noticia.contenido"></div>
      </div>

      <!-- Footer con Compartir -->
      <div class="fixed bottom-0 left-0 right-0 bg-[#f4f6f9]/95 dark:bg-[#1c2533]/95 backdrop-blur-sm border-t border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 px-6 py-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="text-sm text-[#3d4e6c] dark:text-[#f4f6f9]">
            Compartir este artículo:
          </div>
          <div class="flex items-center gap-3">
            <button 
              v-for="red in ['Twitter', 'Facebook', 'LinkedIn']" 
              :key="red"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-[#2c3b53] dark:text-white bg-[#3d4e6c]/10 dark:bg-[#3d4e6c]/20 rounded-xl hover:bg-[#3d4e6c]/20 dark:hover:bg-[#3d4e6c]/30 transition-all duration-300 border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 group"
            >
              <svg class="w-4 h-4 mr-2 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path v-if="red === 'Twitter'" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                <path v-if="red === 'Facebook'" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                <path v-if="red === 'LinkedIn'" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/>
              </svg>
              {{ red }}
            </button>
          </div>
        </div>
      </div>

      <!-- Espaciador para evitar que el contenido quede detrás del footer fijo -->
      <div class="h-24"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  noticia: {
    type: Object,
    required: true
  }
});

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/800x400?text=Imagen+no+disponible';
};
</script>

<style>
/* Estilos para el contenido de la noticia */
.prose {
  @apply text-[#3d4e6c] dark:text-[#f4f6f9];
}

.prose h2 {
  @apply text-2xl font-bold text-[#2c3b53] dark:text-white mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-[#2c3b53] dark:text-white mt-6 mb-3;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose blockquote {
  @apply border-l-4 border-[#3d4e6c] pl-4 py-3 my-6 bg-[#f4f6f9] dark:bg-[#2c3b53]/30 rounded-r-xl italic text-[#3d4e6c] dark:text-[#f4f6f9];
}

.prose a {
  @apply text-[#4c6185] dark:text-[#7389ae] hover:text-[#5d7499] dark:hover:text-[#5a6d8f] underline;
}

.prose ul {
  @apply list-disc list-inside mb-4 space-y-2;
}

.prose ol {
  @apply list-decimal list-inside mb-4 space-y-2;
}

.prose img {
  @apply rounded-xl shadow-lg my-6;
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.prose > * {
  animation: fadeIn 0.5s ease-out forwards;
}
</style> 