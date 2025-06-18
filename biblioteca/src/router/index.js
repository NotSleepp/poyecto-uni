import { createRouter, createWebHistory } from "vue-router";
import BibliotecaView from "../views/BibliotecaView.vue";
import CatalogView from "../views/CatalogView.vue";

const routes = [
  {
    path: "/",
    name: "biblioteca",
    component: BibliotecaView,
    meta: {
      title: "Biblioteca Virtual"
    }
  },
  {
    path: "/catalogo",
    name: "catalogo",
    component: CatalogView,
    meta: {
      title: "Catálogo de Biblioteca"
    }
  }
];

const router = createRouter({
  history: createWebHistory("/frontend/biblioteca/"),
  routes,
});

// Sincronizar el título de la página con la ruta y limpiar modales
router.beforeEach((to, from, next) => {
  // Actualizar título
  document.title = to.meta.title ? `${to.meta.title} - Remote Application` : 'Remote Application';
  
  // Cerrar cualquier modal abierto
  const openModals = document.querySelectorAll('dialog[open]');
  openModals.forEach(modal => modal.close());
  
  next();
});

export default router;
