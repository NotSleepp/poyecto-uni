import { createRouter, createWebHistory } from "vue-router";
import PerfilDashboard from "../views/perfil.vue";

const routes = [
  {
    path: "/",
    name: "perfil",
    component: PerfilDashboard,
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
  document.title = to.meta.title ? `${to.meta.title} - Remote Application` : 'Remote Application';
  next();
});

export default router;
