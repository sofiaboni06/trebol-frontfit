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

    authService.clearSession();
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
   * Validar si el token JWT está vigente y no expirado
   * @param {string} token
   * @returns {boolean}
   */
  isTokenValid: (token) => {
    if (!token) return false;

    const payload = authService.parseJwt(token);
    if (!payload || !payload.exp) return false;

    return Date.now() < payload.exp * 1000;
  },

  parseJwt: (token) => {
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
      const jsonPayload = decodeURIComponent(
        atob(padded)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  },

  /**
   * Revisar si el usuario actual tiene un rol específico
   * @param {string} roleName
   * @returns {boolean}
   */
  hasRole: (roleName) => {
    const user = authService.getUser();
    if (!user || !Array.isArray(user.roles)) return false;

    const normalize = (value) =>
      value?.toString().toUpperCase().replace(/^ROLE_/, '') || '';

    return user.roles.some((role) => normalize(role?.nombre) === normalize(roleName));
  },

  /**
   * Limpiar la sesión local y los tokens
   */
  clearSession: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('usuario');
  },

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} true si el token es válido y hay usuario en localStorage
   */
  isAuthenticated: () => {
    const token = authService.getToken();
    const user = authService.getUser();
    return !!token && !!user && authService.isTokenValid(token);
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
