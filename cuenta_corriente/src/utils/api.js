import { useAuthStore } from '../stores/authStore';
import { useLoadingStore } from '../stores/loading';
import eventBus, { EventTypes } from 'host/eventBus';

// Si existe variable de entorno la usamos, de lo contrario usamos el proxy '/api'
const API_BASE = import.meta.env.VITE_API_BASE || '/api';
//const API_BASE = import.meta.env.VITE_API_BASE || 'http://10.8.0.4:3000';


export async function apiFetch(endpoint, options = {}) {
  const authStore = useAuthStore();
  const loadingStore = useLoadingStore();
  loadingStore.show();

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...authStore.authHeader,
        ...options.headers,
      },
      ...options,
    });

    if (res.status === 401) {
      eventBus.emit(EventTypes.ERROR, new Error('Sesión expirada'));
      authStore.logout();
    }

    const data = await res.json();

    if (!res.ok || data.estado === false) {
      throw new Error(data.mensaje || `Error ${res.status}`);
    }

    return data;
  } catch (e) {
    eventBus.emit(EventTypes.ERROR, e);
    throw e;
  } finally {
    loadingStore.hide();
  }
} 