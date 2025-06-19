import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import eventBus, { EventTypes } from "host/eventBus";
import { useAuthStore } from "../stores/authStore";

// Configuración de NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.3
});

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/auth/Login.vue"),
    meta: {
      title: "Iniciar Sesión",
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: "/login-back",
    name: "login-back",
    component: () => import("../components/auth/login_back.vue"),
    meta: {
      title: "Iniciar Sesión (Nuevo)",
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: "/",
    name: "home",
    component: async () => {
      console.log('🏠 Intentando cargar el componente Home...');
      NProgress.start();
      try {
        console.log('📦 Importando módulo Home...');
        const module = await import("home/Home");
        console.log('✅ Módulo Home importado:', module);
        NProgress.done();
        console.log('🎯 Retornando componente Home...');
        return module.default;
      } catch (error) {
        console.error('❌ Error cargando componente Home:', error);
        console.error('Stack trace:', error.stack);
        NProgress.done();
        eventBus.emit(EventTypes.ERROR, {
          message: "Error al cargar el componente Home",
          error
        });
        throw error;
      }
    },
    meta: {
      title: "Home",
      requiresAuth: true
    }
  },
  {
    path: "/noticias",
    name: "noticias",
    component: () => {
      NProgress.start();
      return import("noticias/Noticias")
        .then(component => {
          NProgress.done();
          return component.default;
        })
        .catch(error => {
          NProgress.done();
          eventBus.emit(EventTypes.ERROR, {
            message: "Error al cargar el componente Noticias",
            error
          });
          throw error;
        });
    },
    meta: {
      title: "Noticias"
    }
  },
  {
    path: "/perfil",
    redirect: "/perfil/datos-personales",
    children: [
      {
        path: "datos-personales",
        name: "perfil",
        component: async () => {
          console.log('👤 Intentando cargar el componente Perfil...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Perfil...');
            const module = await import("perfil/Perfil");
            console.log('✅ Módulo Perfil importado:', module);
            NProgress.done();
            console.log('🎯 Retornando componente Perfil...');
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando componente Perfil:', error);
            console.error('Stack trace:', error.stack);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar el componente Perfil",
              error
            });
            throw error;
          }
        },
        meta: {
          title: "Mi Perfil",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/biblioteca",
    redirect: "/biblioteca/biblioteca-virtual",
    children: [
      {
        path: "biblioteca-virtual",
        name: "biblioteca-virtual",
        component: async () => {
          console.log('📚 Intentando cargar Biblioteca Virtual...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Biblioteca...');
            const module = await import("biblioteca/BibliotecaView");
            console.log('✅ Módulo Biblioteca Virtual importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Biblioteca Virtual:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar la Biblioteca Virtual",
              error
            });
            throw error;
          }
        },
        meta: {
          title: "Biblioteca Virtual",
          requiresAuth: true
        }
      },
      {
        path: "catalogo",
        name: "catalogo-biblioteca",
        component: async () => {
          console.log('📚 Intentando cargar Catálogo Biblioteca...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Catálogo...');
            const module = await import("biblioteca/CatalogView");
            console.log('✅ Módulo Catálogo importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Catálogo Biblioteca:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar el Catálogo de Biblioteca",
              error
            });
            throw error;
          }
        },
        meta: {
          title: "Catálogo Biblioteca",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/cuenta-corriente",
    redirect: "/cuenta-corriente/cuenta-corriente",
    children: [
      {
        path: "cuenta-corriente",
        name: "cuenta-corriente-view",
        component: async () => {
          NProgress.start();
          try {
            const module = await import("cuenta_corriente/CuentaCorrienteView");
            NProgress.done();
            return module.default;
          } catch (error) {
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Cuenta Corriente",
              error
            });
            throw error;
          }
        },
        meta: { title: "Cuenta Corriente", requiresAuth: true }
      },
      {
        path: "matriculacion",
        name: "cuenta-corriente-matriculacion",
        component: async () => {
          NProgress.start();
          try {
            const module = await import("cuenta_corriente/MatriculacionView");
            NProgress.done();
            return module.default;
          } catch (error) {
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Matriculación",
              error
            });
            throw error;
          }
        },
        meta: { title: "Matriculación", requiresAuth: true }
      },
      {
        path: "cupon-pago",
        name: "cuenta-corriente-cupon-pago",
        component: async () => {
          NProgress.start();
          try {
            const module = await import("cuenta_corriente/CuponPagoView");
            NProgress.done();
            return module.default;
          } catch (error) {
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Cupón de Pago",
              error
            });
            throw error;
          }
        },
        meta: { title: "Cupón de Pago", requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log('🚦 Navegando de:', from.path, 'a:', to.path);
  const authStore = useAuthStore();
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log('🔐 Estado de autenticación:', {
    isPublic,
    onlyWhenLoggedOut,
    requiresAuth,
    isAuthenticated: authStore.isAuthenticated
  });

  NProgress.start();

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (requiresAuth && !authStore.isAuthenticated) {
    console.log('⚠️ Ruta protegida y usuario no autenticado, redirigiendo a login');
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  // Si la ruta es solo para usuarios no autenticados y el usuario está autenticado
  if (authStore.isAuthenticated && onlyWhenLoggedOut) {
    console.log('⚠️ Usuario autenticado intentando acceder a ruta de no autenticados, redirigiendo a home');
    return next('/');
  }

  // Si la ruta no es pública y el usuario no está autenticado
  if (!isPublic && !authStore.isAuthenticated) {
    console.log('⚠️ Ruta no pública y usuario no autenticado, redirigiendo a login');
    return next('/login');
  }

  console.log('✅ Navegación permitida');
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
