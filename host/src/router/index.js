import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import eventBus, { EventTypes } from "home/eventBus";
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
