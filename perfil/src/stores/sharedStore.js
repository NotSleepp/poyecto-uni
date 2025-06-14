import { defineStore } from 'pinia';

export const useSharedStore = defineStore('shared', {
  state: () => ({
    currentUser: null,
    theme: 'light',
    notifications: [],
    isDark: localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    userRole: (state) => state.currentUser?.role,
    unreadNotifications: (state) => state.notifications.filter(n => !n.read).length,
  },
  
  actions: {
    setUser(user) {
      this.currentUser = user;
    },
    
    logout() {
      this.currentUser = null;
    },
    
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
    
    addNotification(notification) {
      this.notifications.push({
        ...notification,
        id: Date.now(),
        read: false,
        timestamp: new Date().toISOString()
      });
    },
    
    markNotificationAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    },

    setTheme(isDark) {
      this.isDark = isDark;
      // Aplicar el tema
      const root = document.documentElement;
      if (this.isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },

    initTheme() {
      // Aplicar tema inicial
      this.setTheme(this.isDark);
    }
  }
}); 