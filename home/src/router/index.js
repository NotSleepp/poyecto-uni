import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Inicio"
    }
  }
];

const router = createRouter({
  history: createWebHistory("/frontend/home/"),
  routes,
});

// Sincronizar el título de la página con la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Remote Application` : 'Remote Application';
  next();
});

export default router;
