import { createRouter, createWebHistory } from "vue-router";
import CuentaCorrienteView from "../views/CuentaCorrienteView.vue";
import CuponPagoView from "../views/CuponPagoView.vue";
import MatriculacionView from "../views/MatriculacionView.vue";

const routes = [
  {
    path: "/cuenta-corriente",
    name: "cuenta-corriente",
    component: CuentaCorrienteView,
    meta: { title: "Cuenta Corriente" }
  },
  {
    path: "/cupon-pago",
    name: "cupon-pago",
    component: CuponPagoView,
    meta: { title: "Cupón de Pago" }
  },
  {
    path: "/matriculacion",
    name: "matriculacion",
    component: MatriculacionView,
    meta: { title: "Matriculación" }
  },
  {
    path: "/",
    redirect: "/cuenta-corriente"
  }
];

const router = createRouter({
  history: createWebHistory("/frontend/cuenta_corriente/"),
  routes,
});

// Sincronizar el título de la página con la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Cuenta Corriente` : 'Cuenta Corriente';
  next();
});

export default router;
