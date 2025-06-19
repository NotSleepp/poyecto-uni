import { useLoadingStore } from "../stores/loadingStore"
import { useAuthStore } from "../stores/authStore"

export function initFetchInterceptor() {
  const originalFetch = window.fetch

  window.fetch = async (...args) => {
    const loadingStore = useLoadingStore()
    loadingStore.show()

    try {
      const [resource, config = {}] = args
      const authStore = useAuthStore()
      const token = authStore.token?.value ?? authStore.token ?? localStorage.getItem("token")

      console.log('[HOST Fetch] →', resource, 'tok', token?.slice?.(0,10))

      const headers = {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined
      }

      const response = await originalFetch(resource, { ...config, headers })

      // Intentar obtener el nuevo token
      const newToken = response.headers.get("x-new-token") || response.headers.get("X-New-Token")
      if (newToken) {
        console.log('[HOST Fetch] nuevo token', newToken?.slice?.(0,10))
        // 1. Actualizar Pinia
        authStore.setToken(newToken)
        // 2. Persistir
        localStorage.setItem("token", newToken)
      }

      return response
    } catch (error) {
      console.error("Error en Fetch:", error)
      throw error
    } finally {
      loadingStore.hide()
    }
  }
} 