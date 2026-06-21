import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('usuario');
      try {
        window.dispatchEvent(new Event('auth:logout'));
      } catch (e) {
        // noop
      }
    }

    if (error.response?.status === 403) {
      try {
        window.location.href = '/403';
      } catch (e) {
        // noop
      }
    }

    return Promise.reject(error);
  }
);

export default api;
