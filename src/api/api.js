import axios from 'axios';

// Crear instancia de Axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud para agregar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró (401), limpiar localStorage y redirigir
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('usuario');
      // Aquí puedes redirigir al login si lo necesitas
        // Notificar al resto de la app que la sesión fue cerrada
        try {
          window.dispatchEvent(new Event('auth:logout'));
        } catch (e) {
          // noop
        }
    }
    return Promise.reject(error);
  }
);

export default api;
