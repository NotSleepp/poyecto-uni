import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/style.css';

console.log('[Perfil] Iniciando aplicación standalone');

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

console.log('[Perfil] Aplicación montada');
