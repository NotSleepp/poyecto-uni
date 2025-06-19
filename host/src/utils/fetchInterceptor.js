import { useLoadingStore } from "../stores/loadingStore"

export function initFetchInterceptor() {
  const originalFetch = window.fetch

  window.fetch = async (...args) => {
    const loadingStore = useLoadingStore()
    loadingStore.show()

    try {
      const [resource, config = {}] = args
      const token = localStorage.getItem("token")

      const headers = {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined
      }

      const response = await originalFetch(resource, { ...config, headers })

      // Intentar obtener el nuevo token
      const newToken = response.headers.get("x-new-token") || response.headers.get("X-New-Token")
      if (newToken) {
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