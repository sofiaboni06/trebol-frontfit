import api from './api';
import { getHttpErrorMessage } from '../utils/http-error';

const dashboardService = {
  getDashboard: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del dashboard:', getHttpErrorMessage(error), error);
      throw error;
    }
  },
};

export default dashboardService;
