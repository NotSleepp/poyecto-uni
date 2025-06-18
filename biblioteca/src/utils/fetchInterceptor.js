import { useLoadingStore } from "../stores/loading";
import { useAuthStore } from "../stores/authStore";

// Función para interceptar y modificar todos los fetch
export function initFetchInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const loadingStore = useLoadingStore();
    loadingStore.show();

    try {
      const [resource, config = {}] = args;

      // Obtener token del store (puede ser Ref o string)
      const authStore = useAuthStore();
      const token = authStore.token?.value ?? authStore.token;

      // Configurar headers con el token
      const headers = {
        ...config.headers,
        // Solo incluir Authorization si existe token
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // Realizar la petición con el token
      const response = await originalFetch(resource, { ...config, headers });

      // Verificar si existe el header X-New-Token
      const newToken = response.headers.get("X-New-Token");
      if (newToken) {
        authStore.setToken(newToken);
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
