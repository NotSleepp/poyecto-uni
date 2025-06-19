import { useLoadingStore } from "../stores/loading";
import { useAuthStore as useLocalAuthStore } from "../stores/authStore";
import eventBus, { EventTypes } from 'host/eventBus';
// Intentaremos importar el store de autenticación del host, si está disponible
let useHostAuthStore;
try {
  // webpack/Module Federation expone el alias 'host/authStore'
  // eslint-disable-next-line import/no-unresolved
  useHostAuthStore = (await import('host/authStore')).useAuthStore;
} catch (_) {
  // No estamos dentro del host o el alias no está disponible
  useHostAuthStore = null;
}

// Función para interceptar y modificar todos los fetch
export function initFetchInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const loadingStore = useLoadingStore();
    loadingStore.show();

    try {
      const [resource, config = {}] = args;

      // Obtener token del store (puede ser Ref o string)
      const authStore = useLocalAuthStore();
      const token = authStore.token?.value ?? authStore.token;

      console.log('[FetchInterceptor] Petición a', resource, 'con token', token?.slice?.(0,10));

      // Configurar headers con el token
      const headers = {
        ...config.headers,
        // Solo incluir Authorization si existe token
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // Realizar la petición con el token
      const response = await originalFetch(resource, { ...config, headers });

      // Verificar si existe el header X-New-Token
      const newToken = response.headers.get("X-New-Token") || response.headers.get("x-new-token");
      if (newToken) {
        console.log('[FetchInterceptor] Nuevo token recibido', newToken?.slice?.(0,10));
        // 1. Actualizar store local de micro-frontend
        authStore.setToken(newToken);
        // Emitir al host para sincronizar stores (backup)
        eventBus.emit(EventTypes.DATA_UPDATED, { type: 'token-updated', token: newToken });

        // 2. Persistir en localStorage (respaldo)
        localStorage.setItem('token', newToken);

        // 3. Propagar al store del host, si está accesible
        try {
          if (useHostAuthStore) {
            const hostAuth = useHostAuthStore();
            hostAuth?.setToken?.(newToken);
          }
        } catch (e) {
          console.warn('[CuentaCorriente] No se pudo actualizar el token en el host:', e);
        }
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      loadingStore.hide();
    }
  };
}
