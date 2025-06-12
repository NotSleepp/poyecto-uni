import { defineStore } from 'pinia';
import { useSharedStore } from 'home/store';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // Si no hay tema guardado, usar el tema del sistema
    isDark: localStorage.getItem('theme') !== null 
      ? localStorage.getItem('theme') === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  }),

  getters: {
    currentTheme: (state) => state.isDark ? 'dark' : 'light'
  },

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
      
      // Sincronizar con el store remoto
      const sharedStore = useSharedStore();
      sharedStore.setTheme(this.isDark);
    },

    initTheme() {
      // Si no hay tema guardado, usar el tema del sistema
      if (localStorage.getItem('theme') === null) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.isDark = prefersDark.matches;
        
        // Escuchar cambios en las preferencias del sistema solo si no hay tema guardado
        prefersDark.addEventListener('change', (e) => {
          if (localStorage.getItem('theme') === null) {
            this.isDark = e.matches;
            this.applyTheme();
            const sharedStore = useSharedStore();
            sharedStore.setTheme(this.isDark);
          }
        });
      }

      this.applyTheme();
      
      // Sincronizar con el store remoto
      const sharedStore = useSharedStore();
      sharedStore.setTheme(this.isDark);
    },

    applyTheme() {
      // Aplicar clase al elemento html
      const root = document.documentElement;
      if (this.isDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}); 