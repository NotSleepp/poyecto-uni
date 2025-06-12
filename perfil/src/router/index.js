import { createRouter, createWebHistory } from "vue-router";
import Perfil from "../views/Perfil.vue";

const routes = [
  {
    path: "/",
    name: "perfil",
    component: Perfil,
    meta: {
      title: "Perfil"
    }
  }
];

const router = createRouter({
  history: createWebHistory("/frontend/perfil/"),
  routes,
});

// Sincronizar el título de la página con la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Mi Perfil` : 'Mi Perfil';
  next();
});

export default router;
