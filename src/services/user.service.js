import api from './api';
import { getHttpErrorMessage } from '../utils/http-error';

const userService = {
  getUsers: async () => {
    try {
      const response = await api.get('/usuarios');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error al obtener usuarios:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await api.post('/usuarios', userData);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', getHttpErrorMessage(error), error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/usuarios/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar usuario ${userId}:`, getHttpErrorMessage(error), error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await api.delete(`/usuarios/${userId}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar usuario ${userId}:`, getHttpErrorMessage(error), error);
      throw error;
    }
  },
};

export default userService;
