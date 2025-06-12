import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    selectedCareer: null,
    scrollPosition: 0,
    lastViewedSection: null,
  }),
  actions: {
    setSelectedCareer(career) {
      this.selectedCareer = career;
    },
    clearSelectedCareer() {
      this.selectedCareer = null;
    },
    saveScrollPosition(position) {
      this.scrollPosition = position;
    },
    setLastViewedSection(section) {
      this.lastViewedSection = section;
    },
  },
  persist: true,
});