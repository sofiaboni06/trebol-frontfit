import api from '../api/api';

/**
 * Servicio de productos
 * Adaptado a estructura Spring Boot backend: /api/productos
 * 
 * Propiedades del backend:
 * - id, nombre, descripcion, sku, precio, stock
 * - imagenPrincipal, categoria, tipoProducto, requiereCuidados
 * - estado, slug, fechaCreacion
 */

const productService = {
  /**
   * Obtener todos los productos
   * @param {object} params - Parámetros opcionales {page, limit, search, etc}
   * @returns {Promise} Respuesta con lista de productos
   */
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/productos', {
        params,
      });
      
      // Backend retorna directamente el array de productos
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error('Error al obtener productos:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Obtener un producto por ID
   * @param {string|number} productId - ID del producto
   * @returns {Promise} Respuesta con datos del producto
   */
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/productos/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto ${productId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Crear un nuevo producto (requiere autenticación)
   * @param {object} productData - Datos del producto
   * @returns {Promise} Respuesta con el producto creado
   */
  createProduct: async (productData) => {
    try {
      const response = await api.post('/productos', productData);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Actualizar un producto (requiere autenticación)
   * @param {string|number} productId - ID del producto
   * @param {object} productData - Datos a actualizar
   * @returns {Promise} Respuesta con el producto actualizado
   */
  updateProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/productos/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar producto ${productId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Eliminar un producto (requiere autenticación)
   * @param {string|number} productId - ID del producto
   * @returns {Promise} Respuesta del servidor
   */
  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/productos/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar producto ${productId}:`, error.response?.data || error.message);
      throw error;
    }
  },
};

export default productService;
