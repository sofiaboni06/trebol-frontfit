import api from './api';

const getDashboard = () => api.get('/api/admin/analytics/dashboard').then(r => r.data);

const registrarUsoIA = (payload) => api.post('/api/admin/analytics/event/ia', payload);

const registrarEscaneo = (payload) => api.post('/api/admin/analytics/event/escaneo', payload);

export default { getDashboard, registrarUsoIA, registrarEscaneo };
