import api from './api';
import { getHttpErrorMessage } from '../utils/http-error';

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
      console.error('Error al obtener productos:', getHttpErrorMessage(error), error);
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
      console.error(`Error al obtener producto ${productId}:`, getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Buscar productos en el backend con filtros
   * @param {object} filters - Filtros a aplicar
   *   - nombre: término de búsqueda por nombre
   *   - categoriaId: ID de la categoría
   *   - precioMin: precio mínimo
   *   - precioMax: precio máximo
   * @returns {Promise} Respuesta con productos filtrados
   */
  searchProducts: async (filters = {}) => {
    try {
      const params = {};
      if (filters.nombre) params.nombre = filters.nombre;
      if (filters.categoriaId) params.categoriaId = filters.categoriaId;
      if (filters.precioMin !== undefined) params.precioMin = filters.precioMin;
      if (filters.precioMax !== undefined) params.precioMax = filters.precioMax;

      const response = await api.get('/productos/buscar', { params });
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error('Error al buscar productos:', getHttpErrorMessage(error), error);
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
      console.error('Error al crear producto:', getHttpErrorMessage(error), error);
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
      console.error(`Error al actualizar producto ${productId}:`, getHttpErrorMessage(error), error);
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
      console.error(`Error al eliminar producto ${productId}:`, getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Subir una imagen (multipart) y obtener la URL pública
   * @param {File} file - Archivo a subir
   * @returns {Promise<string>} URL devuelta por el servidor
   */
  uploadImage: async (file) => {
    try {
      const form = new FormData();
      form.append('file', file);
      const response = await api.post('/images/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data?.url;
    } catch (error) {
      console.error('Error subiendo imagen:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Simular un escaneo: enviar código (SKU) al backend /api/scanner
   * @param {string} codigo
   */
  scan: async (codigo, usuarioId = null) => {
    try {
      const payload = { codigo };
      if (usuarioId) payload.usuarioId = usuarioId;
      const response = await api.post('/scanner', payload);
      return response.data;
    } catch (error) {
      console.error('Error en scanner:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  analyzeImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('imagen', file);
      const response = await api.post('/scanner/analyze-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Error analizando imagen:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  /**
   * Buscar y filtrar productos localmente
   * @param {array} products - Lista de productos a filtrar
   * @param {object} filters - Objeto con filtros a aplicar
   *   - categories: array de IDs o nombres de categorías
   *   - priceMin: precio mínimo
   *   - priceMax: precio máximo
   *   - search: término de búsqueda
   *   - sortBy: criterio de ordenamiento (price-low, price-high, name, featured)
   * @returns {array} Productos filtrados y ordenados
   */
  filterAndSort: (products, filters = {}) => {
    let filtered = [...products];

    // Filtrar por búsqueda
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.nombre?.toLowerCase().includes(searchTerm) ||
          product.descripcion?.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por categorías
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((product) => {
        const categoryId = product.categoria?.id;
        const categoryName = product.categoria?.nombre;
        return (
          filters.categories.includes(categoryId) ||
          filters.categories.includes(categoryName)
        );
      });
    }

    // Filtrar por rango de precio
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.precio) || 0;
        const min = filters.priceMin !== undefined ? filters.priceMin : 0;
        const max = filters.priceMax !== undefined ? filters.priceMax : Infinity;
        return price >= min && price <= max;
      });
    }

    // Filtrar por tipo de producto (si aplica)
    if (filters.tipoProducto && filters.tipoProducto.length > 0) {
      filtered = filtered.filter((product) =>
        filters.tipoProducto.includes(product.tipoProducto)
      );
    }

    // Ordenar
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
          break;
        case 'price-high':
          filtered.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
          break;
        case 'name':
          filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case 'featured':
        default:
          // Mantener orden original
          break;
      }
    }

    return filtered;
  },

  /**
   * Extraer atributos únicos de los productos para filtros dinámicos
   * @param {array} products - Lista de productos
   * @returns {object} Objeto con arrays de atributos únicos
   */
  getFilterAttributes: (products) => {
    const categories = new Map();
    const tiposProducto = new Set();
    const priceRange = { min: Infinity, max: 0 };

    products.forEach((product) => {
      // Categorías
      if (product.categoria) {
        const key = product.categoria.id;
        if (!categories.has(key)) {
          categories.set(key, {
            id: product.categoria.id,
            nombre: product.categoria.nombre,
            descripcion: product.categoria.descripcion,
            imagen: product.categoria.imagen,
          });
        }
      }

      // Tipos de producto
      if (product.tipoProducto) {
        tiposProducto.add(product.tipoProducto);
      }

      // Rango de precios
      const price = parseFloat(product.precio) || 0;
      priceRange.min = Math.min(priceRange.min, price);
      priceRange.max = Math.max(priceRange.max, price);
    });

    return {
      categories: Array.from(categories.values()),
      tiposProducto: Array.from(tiposProducto),
      priceRange: {
        min: priceRange.min === Infinity ? 0 : priceRange.min,
        max: priceRange.max === 0 ? 0 : priceRange.max,
      },
    };
  },
};

export default productService;
