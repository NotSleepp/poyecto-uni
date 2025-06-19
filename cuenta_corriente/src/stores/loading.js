import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({ count: 0 }),
  getters: {
    isLoading: (state) => state.count > 0,
  },
  actions: {
    show() {
      this.count += 1;
    },
    hide() {
      if (this.count > 0) this.count -= 1;
    },
    reset() {
      this.count = 0;
    },
  },
}); 