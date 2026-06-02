import api from './api';
import { getHttpErrorMessage } from '../utils/http-error';

/**
 * Servicio de autenticación
 * Adaptado a estructura Spring Boot backend
 */

const authService = {
  /**
   * Login - envía credenciales al backend
   * @param {string} correo - Correo del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise} Respuesta del servidor con token y datos del usuario
   */
  login: async (correo, password) => {
    try {
      const response = await api.post('/auth/login', {
        correo,
        password,
      });

      // Guardar token en localStorage si la respuesta lo contiene
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Guardar refreshToken si está disponible
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      // Guardar datos del usuario si están disponibles
      if (response.data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }

      return response.data;
    } catch (error) {
      console.error('Error en login:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Register - registra un nuevo usuario
   * @param {object} userData - Datos del usuario {nombre, apellido, correo, password, telefono?, direccion?}
   * @returns {Promise} Respuesta del servidor
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);

      // Guardar token si la respuesta lo contiene
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Guardar refreshToken si está disponible
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      // Guardar datos del usuario si están disponibles
      if (response.data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }

      return response.data;
    } catch (error) {
      console.error('Error en registro:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Logout - limpia el token y datos del usuario
   */
  logout: () => {
    // Intentar notificar al backend si existe endpoint de logout
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        // No await here to keep API compatible with sync callers; fire-and-forget
        api.post('/auth/logout', { refreshToken }).catch((err) => {
          console.warn('Logout endpoint failed or not available:', err?.response?.status || err.message);
        });
      }
    } catch (err) {
      console.warn('Error intentando llamar endpoint logout:', err.message);
    }

    // Limpiar almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('usuario');
  },

  /**
   * Obtener token almacenado
   * @returns {string|null} Token JWT o null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Obtener refresh token almacenado
   * @returns {string|null} Refresh token o null
   */
  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} true si existe token
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Obtener datos del usuario almacenado
   * @returns {object|null} Datos del usuario o null
   */
  getUser: () => {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Actualizar perfil del usuario
   * @param {number} id - ID del usuario
   * @param {object} userData - Datos a actualizar {nombre, apellido, correo, password, telefono, direccion}
   * @returns {Promise} Respuesta del servidor con usuario actualizado
   */
  updateUserProfile: async (id, userData) => {
    try {
      const response = await api.put(`/usuarios/${id}`, userData);

      // Actualizar datos del usuario en localStorage con la respuesta del backend
      if (response.data) {
        localStorage.setItem('usuario', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.error('Error al actualizar perfil:', getHttpErrorMessage(error), error);
      throw error;
    }
  },
};

export default authService;
