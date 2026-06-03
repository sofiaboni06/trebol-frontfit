import api from './api';
import { getHttpErrorMessage } from '../utils/http-error';

/**
 * Servicio de categorías
 * Adaptado a estructura Spring Boot backend: /api/categorias
 * 
 * Propiedades del backend:
 * - id, nombre, descripcion, imagen
 */

const categoryService = {
  /**
   * Obtener todas las categorías
   * @returns {Promise} Respuesta con lista de categorías
   */
  getCategories: async () => {
    try {
      const response = await api.get('/categorias');
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error('Error al obtener categorías:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Obtener una categoría por ID
   * @param {string|number} categoryId - ID de la categoría
   * @returns {Promise} Respuesta con datos de la categoría
   */
  getCategoryById: async (categoryId) => {
    try {
      const response = await api.get(`/categorias/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener categoría ${categoryId}:`, getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Crear una nueva categoría (requiere autenticación)
   * @param {object} data - Datos de la categoría
   * @returns {Promise} Respuesta con categoría creada
   */
  createCategory: async (data) => {
    try {
      const response = await api.post('/categorias', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear categoría:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Actualizar una categoría (requiere autenticación)
   * @param {string|number} categoryId - ID de la categoría
   * @param {object} data - Datos actualizados
   * @returns {Promise} Respuesta con categoría actualizada
   */
  updateCategory: async (categoryId, data) => {
    try {
      const response = await api.put(`/categorias/${categoryId}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar categoría ${categoryId}:`, getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Eliminar una categoría (requiere autenticación)
   * @param {string|number} categoryId - ID de la categoría
   * @returns {Promise} Respuesta de eliminación
   */
  deleteCategory: async (categoryId) => {
    try {
      await api.delete(`/categorias/${categoryId}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar categoría ${categoryId}:`, getHttpErrorMessage(error), error);
      throw error;
    }
  },
};

export default categoryService;
